import Box from '@mui/material/Box';
import { Banner } from './Components/Banner';
import { loginStyles } from './LoginStyles';

const Login = () => {
  return (
    <Box sx={loginStyles.container}>
      <Box sx={loginStyles.banner}>
        <Banner />
      </Box>
    </Box>
  );
};

export { Login };
