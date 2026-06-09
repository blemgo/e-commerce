import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { SearchBar } from '@components/SearchBar';
import { navbarStyles } from './Navbar.styles';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={navbarStyles.brand}
        >
          E-Commerce
        </Typography>

        <SearchBar />

        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
