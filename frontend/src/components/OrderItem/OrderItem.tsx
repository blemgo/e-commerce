import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { orderItemStyles } from './OrderItem.styles';

interface OrderItemProps {
  image?: string;
  name: string;
  quantity: number;
  price: number;
}

const OrderItem = ({ image, name, quantity, price }: OrderItemProps) => {
  return (
    <Box sx={orderItemStyles.row}>
      <Badge badgeContent={quantity} sx={orderItemStyles.qtyBadge}>
        <Box component="img" src={image} alt={name} sx={orderItemStyles.thumbnail} />
      </Badge>
      <Typography sx={orderItemStyles.name}>{name}</Typography>
      <Typography sx={orderItemStyles.price}>€{price.toFixed(2)}</Typography>
    </Box>
  );
};

export { OrderItem };
