import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#266bb5',
    },
    secondary: {
      main: '#fc6944',
      dark: '#e85230',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f4f5f7',
    },
    warning: {
      main: '#181b20',
      contrastText: '#f4f4f4',
    },
    info: {
      main: '#ffffff',
      dark: '#f7f8fa',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

export default theme;
