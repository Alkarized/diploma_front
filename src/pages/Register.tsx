import {useState, useEffect} from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {validateForm} from "../functionality/validation";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import NotifyCenter, {notifyError} from "../components/NotifyCenter"
import {checkIfLogged, register} from "../functionality/AuthService";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {parseError} from "../functionality/errorParser";

const defaultTheme = createTheme();

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState(new Map<string, string>());
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleChange =  (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let tempErrs : Map<string, string> = validateForm(formData)
        setErrors(tempErrs);

        if (0 === tempErrs.size) {
            const res = await register(formData);
            if (res instanceof AxiosError){
                console.log(res);
                notifyError(parseError(res));
            } else {
                navigate('/main', { state: { appear: "Вы успешно зарегестрировались!" } })
            }
        }
    };


    useEffect(() => {
        if (checkIfLogged()){
            navigate('/main');
        }
    }, [])

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
                        Регистрация
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{
                        mt: 3,
                        "& .MuiInputLabel-root.Mui-error": {
                            color: "#ed5151",
                        },
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                            border: "2px solid #ed5151",
                        },
                        "& .MuiFormHelperText-root.Mui-error": {
                            color: "#ed5151",
                        }
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Логин"
                                    autoFocus
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.has('username')}
                                    helperText={errors.get('username')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Имя"
                                    name="firstname"
                                    autoComplete="family-name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    error={errors.has('firstname')}
                                    helperText={errors.get('firstname')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.has('email')}
                                    helperText={errors.get('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегестрироваться
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Есть аккаунт? Войти
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}