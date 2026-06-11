import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sidePanelStyles } from './SidePanel.styles';

export interface SidePanelItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface SidePanelProps {
  items: SidePanelItem[];
  footer?: ReactNode;
}

const SidePanel = ({ items, footer }: SidePanelProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string): boolean =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <Box sx={sidePanelStyles.panel}>
      <List sx={sidePanelStyles.list} disablePadding>
        {items.map(item => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => navigate(item.path)}
            sx={sidePanelStyles.item}
            disableRipple
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      {footer && <Box sx={sidePanelStyles.footer}>{footer}</Box>}
    </Box>
  );
};

export { SidePanel };
