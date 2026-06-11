import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@components/Navbar';
import { CatalogNavBar } from '@components/CatalogNavBar';
import { layoutStyles } from './Layout.styles';

interface LayoutProps {
  variant?: 'catalog' | 'basic';
}

const Layout = ({ variant = 'catalog' }: LayoutProps) => {
  return (
    <Box sx={layoutStyles.wrapper}>
      {variant === 'catalog' ? <CatalogNavBar /> : <Navbar />}
      <Box component="main" sx={layoutStyles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export { Layout };
