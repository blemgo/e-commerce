import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import ballyLogo from '@/assets/bally-black.png';
import { navbarStyles } from './Navbar.styles';

interface NavbarProps {
  left?: ReactNode;
  right?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ left, right }: NavbarProps) => {
  return (
    <AppBar position="sticky" color="transparent" sx={navbarStyles.appBar}>
      <Toolbar sx={navbarStyles.toolbar}>
        <Box sx={navbarStyles.left}>{left}</Box>

        <Box sx={navbarStyles.center}>
          <Link to="/">
            <Box component="img" src={ballyLogo} alt="Bally" sx={navbarStyles.logo} />
          </Link>
        </Box>

        <Box sx={navbarStyles.right}>{right}</Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
