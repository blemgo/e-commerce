import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import type { CartItem as CartItemType } from '@types';
import { cartItemStyles } from './CartItem.styles';

interface CartItemProps {
  item: CartItemType;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
}

const CartItem = ({ item, onAdd, onRemove, onDelete }: CartItemProps) => {
  const { product, quantity } = item;
  const total = product.price * quantity;

  return (
    <Box sx={cartItemStyles.root}>
      <Box
        component="img"
        src={product.productImage}
        alt={product.name}
        sx={cartItemStyles.thumbnail}
      />

      <Box sx={cartItemStyles.details}>
        <Box sx={cartItemStyles.topRow}>
          <Typography sx={cartItemStyles.name}>{product.name}</Typography>
          <Typography sx={cartItemStyles.totalPrice}>€{total}</Typography>
        </Box>

        <Typography sx={cartItemStyles.unitPrice}>€{product.price}</Typography>

        <Box sx={cartItemStyles.controls}>
          <IconButton onClick={onRemove} sx={cartItemStyles.qtyButton} disableRipple>
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>

          <Typography sx={cartItemStyles.qtyDisplay}>{quantity}</Typography>

          <IconButton onClick={onAdd} sx={cartItemStyles.qtyButton} disableRipple>
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>

          <IconButton onClick={onDelete} sx={cartItemStyles.deleteButton} disableRipple>
            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export { CartItem };
