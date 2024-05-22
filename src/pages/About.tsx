import {Box, Button, Container, Stack, Typography} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from '@mui/icons-material/Login';
import WebIcon from '@mui/icons-material/Web';
import * as React from "react";

export default function About() {
    return (
        <Container maxWidth="sm">
            <Box sx={{my: 3}}>
                <Typography align="center" variant="h4" component="h1" gutterBottom>
                    Приветственная страница!
                </Typography>
                <Stack direction="column" spacing={4}>
                    <Button variant="contained" startIcon={<LoginIcon/>} href="/login">
                        Login Page
                    </Button>
                    <Button variant="contained" startIcon={<AppRegistrationIcon/>} href="/register">
                        Register Page
                    </Button>
                    <Button variant="contained" startIcon={<WebIcon/>} href="/main">
                        Main Page
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}