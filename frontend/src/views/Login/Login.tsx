import Box from '@mui/material/Box';
import { Banner } from './Components/Banner/Banner';
import { loginStyles } from './LoginStyles';
import { SignIn } from '@/components/SignIn/SignIn';

const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },

];

const Login = () => {
  return (
    <Box sx={loginStyles.container}>
      <Box sx={loginStyles.banner}>
        <Banner />
      </Box>
      <Box sx={loginStyles.signIn}>
        <SignIn onSubmit={() => {}} onGoogleLogin={() => {}} onAppleLogin={() => {}} onForgotPassword={() => {}} onCreateAccount={() => {}} />
      </Box>
    </Box>
  );
};

export { Login };
