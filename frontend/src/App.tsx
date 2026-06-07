import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Router } from '@/router';
import theme from './theme/theme';
import { UserProvider } from '@contexts/user';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
