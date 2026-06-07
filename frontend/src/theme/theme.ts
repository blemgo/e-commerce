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
    fontFamily: '"Inter", "Heebo", sans-serif',
    h1: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Bricolage Grotesque", "Heebo", sans-serif', fontWeight: 600 },
    button: { fontWeight: 600 },
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
