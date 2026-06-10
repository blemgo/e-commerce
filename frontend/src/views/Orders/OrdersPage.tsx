import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ordersPageStyles } from './OrdersPage.styles';

const OrdersPage = () => {
  return (
    <Box sx={ordersPageStyles.container}>
      <Typography variant="h4">Orders</Typography>
    </Box>
  );
};

export { OrdersPage };
