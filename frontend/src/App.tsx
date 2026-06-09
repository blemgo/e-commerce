import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import { Router } from '@/router';
import theme from './theme/theme';
import { UserProvider } from '@contexts/user';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NuqsAdapter>
        <UserProvider>
          <Router />
        </UserProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
};

export default App;
