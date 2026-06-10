import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { OrderItem } from '@components/OrderItem';
import type { CartItem } from '@types';
import { orderSummaryStyles } from './OrderSummary.styles';

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box sx={orderSummaryStyles.container}>
      <Box sx={orderSummaryStyles.items}>
        {items.map(item => (
          <OrderItem
            key={item.id}
            image={item.product.productImage}
            name={item.product.name}
            quantity={item.quantity}
            price={item.product.price * item.quantity}
          />
        ))}
      </Box>

      <Box sx={orderSummaryStyles.footer}>
        <Box sx={orderSummaryStyles.footerRow}>
          <Typography sx={orderSummaryStyles.footerLabel}>
            Subtotal · {totalQuantity} items
          </Typography>
          <Typography sx={orderSummaryStyles.footerValue}>€{total}</Typography>
        </Box>

        <Box sx={orderSummaryStyles.footerRow}>
          <Typography sx={orderSummaryStyles.footerLabel}>Shipping</Typography>
          <Typography sx={orderSummaryStyles.footerValue}>FREE</Typography>
        </Box>

        <Box sx={orderSummaryStyles.footerRow}>
          <Typography sx={orderSummaryStyles.totalLabel}>Total</Typography>
          <Typography sx={orderSummaryStyles.totalValue}>€{total}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { OrderSummary };
