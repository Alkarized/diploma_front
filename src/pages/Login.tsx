import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {validateForm} from "../functionality/validation";
import {useState} from "react";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import NotifyCenter, {notifyError, notifySuccess, notifyWarning} from "../components/NotifyCenter";
import {parseError} from "../functionality/errorParser";
import {useLocation, useNavigate} from 'react-router-dom';
import {checkIfLogged, login} from "../functionality/AuthService";
import {AxiosError} from "axios";

const defaultTheme = createTheme();

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    function displayLogin(props : any){
        if (!isDisplayed && props){
            if ('appear' in props){
                notifyWarning(props.appear);
            } else if ('good' in props) {
                notifySuccess(props.good)
            }
            setDisplayed(true);
            window.history.replaceState({}, '')
        }
    }

    const [isDisplayed, setDisplayed] = useState(false);
    const [errors, setErrors] = useState(new Map<string, string>());
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    let location = useLocation();

    React.useEffect(() => {
        if (checkIfLogged()){
            navigate('/main');
        }
        displayLogin(location.state)
    }, [location.state, navigate]);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tempErrs : Map<string, string> = validateForm(formData)
        setErrors(tempErrs);

        if (0 === tempErrs.size) {
            const res = await login(formData);
            if (res instanceof AxiosError){
                console.log(res);
                notifyError(parseError(res));
            } else {
                navigate('/main', { state: { appear: "Вы успешно зашли!" } })
            }

        }
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <NotifyCenter/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            error={errors.has('username')}
                            helperText={errors.get('username')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.has('password')}
                            helperText={errors.get('password')}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}