import React, { useState, useCallback } from 'react';
import { Button, Grid, Typography, Box, Paper, Avatar, Link } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../utils/validationSchemas';
import { defaultTheme } from '../utils/theme';
import { EMAIL, PASSWORD } from '../constants/routes';
import { useDispatch } from 'react-redux';
import { login } from '../redux/Slice/authSlice';

const SnackbarAlert = React.lazy(() => import('./CustomComponents/SnackbarAlert'));
const TextFieldComponent = React.lazy(() => import('./CustomComponents/TextFieldComponent'));


const SignInSide = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const handleSubmit = useCallback(async (values) => {
        try {
            const result = await dispatch(login(values));
            const response = result.payload;
            console.log('result', response);
            setMessage("Login successfully!!");
            setSeverity("success");
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            setOpen(true);
            setSeverity("error");
            setMessage("Something Went Wrong!!");
        }
    }, [dispatch, navigate]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url("/test.jpg")',
                        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login Employee
                        </Typography>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <TextFieldComponent
                                        name="email"
                                        label={EMAIL}
                                        touched={touched}
                                        errors={errors}
                                        required
                                    />
                                    <TextFieldComponent
                                        name="password"
                                        label={PASSWORD}
                                        type="password"
                                        touched={touched}
                                        errors={errors}
                                        required
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Login
                                    </Button>
                                    <Grid container sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        <Grid item>
                                            <Link onClick={() => navigate('/register')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link onClick={() => navigate('/forget/password')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                {"Forgot Password?"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
            <SnackbarAlert
                open={open}
                severity={severity}
                onClose={handleClose}
                message={message}
            />
        </ThemeProvider>
    );
};

export default SignInSide;
