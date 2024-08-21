import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, FormControl, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import logoImage from '../../public/logoImage.png';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [error, setError] = useState("");
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSignUp = async () => {
        if (!email || !password) {
            setError('Email and Password both are required');
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            await sendEmailVerification(user);
            setOpenSuccessDialog(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Email and Password both are required');
            return;
        }

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            if (user.emailVerified) {
                navigate('/home');
            } else {
                setError('Please verify your email before logging in.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

    return (
        <>
            <Container maxWidth='sm' sx={{ mt: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 4,
                        paddingBottom: 7,
                        paddingLeft: 4,
                        paddingRight: 4,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        marginLeft: 3,
                        width: '80%'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar alt="Logo" src={logoImage} sx={{ width: 130, height: 130 }} />
                    </Box>
                    <Typography variant="h4" gutterBottom>
                        {isSignUpActive ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form>
                        <FormControl fullWidth margin="normal">
                            <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} required />
                        </FormControl>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={isSignUpActive ? handleSignUp : handleSignIn}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            {isSignUpActive ? 'Sign Up' : 'Sign In'}
                        </Button>
                        {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
                        <Button
                            type="button"
                            color="secondary"
                            onClick={handleMethodChange}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            {isSignUpActive ? 'Already have an account? Sign In' : 'Do not have an account? Sign Up'}
                        </Button>
                    </form>
                </Box>
            </Container>
            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography color="primary" sx={{ textAlign: 'center' }}>
                        Account created successfully. Please check your email to verify your account.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSuccessDialog(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AuthForm;
