import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';
import { Router } from '@/router';
import theme from '@shared/theme/theme';
import { CartProvider } from '@contexts/cart';
import { UserProvider } from '@contexts/user';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NuqsAdapter>
        <UserProvider>
          <CartProvider>
            <Router />
          </CartProvider>
        </UserProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
};

export default App;
