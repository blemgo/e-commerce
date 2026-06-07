import { useState } from 'react';
import Box from '@mui/material/Box';
import { Banner } from './Components/Banner/Banner';
import { loginStyles } from './LoginStyles';
import { SignIn } from '@/components/SignIn/SignIn';
import { SignUp } from '@/components/SignUp';
import useLocalLogin from '@/api/hooks/auth/useLocalLogin';
import useLocalRegister from '@/api/hooks/auth/useLocalRegister';
import { useUserContext } from '@/contexts/user';
import { useNavigate } from 'react-router-dom';
import api from '@api/api';

type AuthView = 'signIn' | 'signUp';

const LoginPage = () => {
  const [authView, setAuthView] = useState<AuthView>('signIn');
  const { setUser, setAccessToken } = useUserContext();
  const { localLogin, isLoading: isLoginLoading } = useLocalLogin();
  const { localRegister, isLoading: isRegisterLoading } = useLocalRegister();
  const navigate = useNavigate();

  const onLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    const { user, accessToken } = await localLogin({ email, password, rememberMe });

    setUser(user);
    setAccessToken(accessToken);

    navigate('/');
  };

  const onRegisterSubmit = async (fullName: string, email: string, password: string) => {
    const { user, accessToken } = await localRegister({ fullName, email, password });

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
        {authView === 'signIn' ? (
          <SignIn
            onSubmit={onLoginSubmit}
            onGoogleLogin={api.auth().googleLogin}
            onCreateAccount={() => setAuthView('signUp')}
            loading={isLoginLoading}
          />
        ) : (
          <SignUp
            onSubmit={onRegisterSubmit}
            onSignIn={() => setAuthView('signIn')}
            loading={isRegisterLoading}
          />
        )}
      </Box>
    </Box>
  );
};

export { LoginPage };
