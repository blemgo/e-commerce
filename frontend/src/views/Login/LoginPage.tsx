import Box from '@mui/material/Box';
import { Banner } from './Components/Banner/Banner';
import { loginStyles } from './LoginStyles';
import { SignIn } from '@/components/SignIn/SignIn';
import useLocalLogin from '@/api/hooks/auth/useLocalLogin';
import { useUserContext } from '@/contexts/user';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { setUser, setAccessToken } = useUserContext();
  const { localLogin } = useLocalLogin();
  const navigate = useNavigate();

  const onLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    const { user, accessToken } = await localLogin({ email, password, rememberMe });

    setUser(user);
    setAccessToken(accessToken);

    navigate('/');
  };

  return (
    <Box sx={loginStyles.container}>
      <Box sx={loginStyles.banner}>
        <Banner />
      </Box>
      <Box sx={loginStyles.signIn}>
        <SignIn onSubmit={onLoginSubmit} onGoogleLogin={() => {}} onCreateAccount={() => {}} />
      </Box>
    </Box>
  );
};

export { LoginPage };
