import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@components/Navbar';
import { layoutStyles } from './Layout.styles';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={layoutStyles.main}>
        <Outlet />
      </Box>
    </>
  );
};

export { Layout };
