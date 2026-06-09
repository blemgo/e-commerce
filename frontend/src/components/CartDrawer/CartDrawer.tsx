import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { cartDrawerStyles } from './CartDrawer.styles';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={cartDrawerStyles.container} />
    </Drawer>
  );
};

export { CartDrawer };
