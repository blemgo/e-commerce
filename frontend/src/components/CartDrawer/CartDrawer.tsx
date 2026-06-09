import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useCartContext } from '@contexts/cart';
import { useAppendCartItem } from '@contexts/cart/hooks/useAppendCartItem';
import { CartItem } from './CartItem';
import { cartDrawerStyles } from './CartDrawer.styles';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer = ({ open, onClose, onCheckout }: CartDrawerProps) => {
  const { cart, setItemQuantity } = useCartContext();
  const { appendCartItem } = useAppendCartItem();

  const items = cart?.items ?? [];
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: cartDrawerStyles.paper } }}
    >
      <Box sx={cartDrawerStyles.header}>
        <Box sx={cartDrawerStyles.titleRow}>
          <Typography sx={cartDrawerStyles.title}>Cart</Typography>
          {totalQuantity > 0 && (
            <Box sx={cartDrawerStyles.badge}>{totalQuantity}</Box>
          )}
        </Box>
        <IconButton onClick={onClose} sx={cartDrawerStyles.closeButton} disableRipple>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      <Box sx={cartDrawerStyles.itemsContainer}>
        {items.length === 0 ? (
          <Box sx={cartDrawerStyles.emptyState}>Your cart is empty</Box>
        ) : (
          items.map((item, index) => (
            <Box key={item.id}>
              <CartItem
                item={item}
                onAdd={() => appendCartItem(item.product.id)}
                onRemove={() => setItemQuantity(item.product.id, item.quantity - 1)}
                onDelete={() => setItemQuantity(item.product.id, 0)}
              />
              {index < items.length - 1 && <Divider sx={cartDrawerStyles.divider} />}
            </Box>
          ))
        )}
      </Box>

      <Box sx={cartDrawerStyles.footer}>
        <Box sx={cartDrawerStyles.totalRow}>
          <Typography sx={cartDrawerStyles.totalLabel}>Estimated total</Typography>
          <Typography sx={cartDrawerStyles.totalAmount}>€{totalPrice}</Typography>
        </Box>
        <Typography sx={cartDrawerStyles.taxNote}>
          Taxes included. Discounts and <strong>shipping</strong> calculated at checkout.
        </Typography>
        <Button
          onClick={onCheckout}
          sx={cartDrawerStyles.checkoutButton}
          disableRipple
          disableElevation
        >
          Check out
        </Button>
      </Box>
    </Drawer>
  );
};

export { CartDrawer };
