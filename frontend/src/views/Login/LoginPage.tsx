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
import { isUnauthorizedError } from '@/utils/getResponseStatus';

type AuthView = 'signIn' | 'signUp';

const LOGIN_UNAUTHORIZED_MESSAGE = 'Incorrect email or password.';

const LoginPage = () => {
  const [authView, setAuthView] = useState<AuthView>('signIn');
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser } = useUserContext();
  const { localLogin, isLoading: isLoginLoading } = useLocalLogin();
  const { localRegister, isLoading: isRegisterLoading } = useLocalRegister();
  const navigate = useNavigate();

  const onLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setLoginError(null);

    try {
      const user = await localLogin({ email, password, rememberMe });

      setUser(user);

      navigate('/');
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setLoginError(LOGIN_UNAUTHORIZED_MESSAGE);
      }
    }
  };

  const onRegisterSubmit = async (fullName: string, email: string, password: string) => {
    const user = await localRegister({ fullName, email, password });

    setUser(user);

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
            onCreateAccount={() => {
              setLoginError(null);
              setAuthView('signUp');
            }}
            authError={loginError}
            onDismissAuthError={() => setLoginError(null)}
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
