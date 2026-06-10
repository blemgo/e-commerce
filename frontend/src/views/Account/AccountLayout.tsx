import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { SidePanel } from '@components/SidePanel';
import type { SidePanelItem } from '@components/SidePanel';
import { useUserContext } from '@contexts/user';
import { Role } from '@types';
import { accountLayoutStyles } from './AccountLayout.styles';

const ACCOUNT_ITEMS: SidePanelItem[] = [
  {
    label: 'Orders & tracking',
    icon: <Inventory2OutlinedIcon />,
    path: '/account/orders',
  },
  { label: 'Addresses', icon: <PlaceOutlinedIcon />, path: '/account/addresses' },
  { label: 'Profile', icon: <PersonOutlineIcon />, path: '/account/profile' },
];

const AccountLayout = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const footer = (
    <Box sx={accountLayoutStyles.footer}>
      {user?.role === Role.ADMIN && (
        <Button
          fullWidth
          startIcon={<AdminPanelSettingsOutlinedIcon />}
          onClick={() => navigate('/admin')}
          sx={accountLayoutStyles.adminButton}
          disableElevation
        >
          Admin panel
        </Button>
      )}

      <Button
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={accountLayoutStyles.logoutButton}
        disableRipple
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Box sx={accountLayoutStyles.container}>
      <SidePanel items={ACCOUNT_ITEMS} footer={footer} />

      <Box component="section" sx={accountLayoutStyles.content}>
        <Outlet />
      </Box>
    </Box>
  );
};

export { AccountLayout };
