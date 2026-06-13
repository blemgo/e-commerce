import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { LoadingScreen } from '@components/LoadingScreen';
import { OrderItem } from '@components/OrderItem';
import { useGetOrder } from '@api/hooks/orders/useGetOrder';
import { formatDate } from '@/utils/formatDate';
import { formatAddressLine1, formatAddressLine2 } from '@/utils/formatAddress';
import { OrderStatus } from '@types';
import { orderTrackingStyles } from './OrderTrackingPage.styles';

const TRACKING_STEPS = [
  { status: OrderStatus.PROCESSING, label: 'Processing' },
  { status: OrderStatus.SHIPPED, label: 'Shipped' },
  { status: OrderStatus.DELIVERED, label: 'Delivered' },
];

const OrderTrackingPage: React.FC = () => {
  const { orderId = '' } = useParams();
  const { order, loading } = useGetOrder(orderId);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!order) {
    return <Typography sx={orderTrackingStyles.empty}>Order not found.</Typography>;
  }

  const stepIndex = TRACKING_STEPS.findIndex(step => step.status === order.status);
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={orderTrackingStyles.container}>
      <Box sx={orderTrackingStyles.header}>
        <Typography variant="h4" sx={orderTrackingStyles.title}>
          Order tracking
        </Typography>
        <Typography sx={orderTrackingStyles.subtitle}>
          Order {order.trackingId} · placed {formatDate(order.createdAt)}
        </Typography>
      </Box>

      <Box sx={orderTrackingStyles.layout}>
        <Box sx={orderTrackingStyles.main}>
          <Box sx={orderTrackingStyles.card}>

            {order.status === OrderStatus.CANCELLED ? (
              <Typography sx={orderTrackingStyles.cancelled}>
                This order was cancelled.
              </Typography>
            ) : (
              <Stepper activeStep={stepIndex} alternativeLabel sx={orderTrackingStyles.stepper}>
                {TRACKING_STEPS.map(step => (
                  <Step key={step.status}>
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Box>

          <Box sx={orderTrackingStyles.card}>
            <Typography sx={orderTrackingStyles.cardTitle}>Items in this order</Typography>
            <Box sx={orderTrackingStyles.items}>
              {order.items.map(item => (
                <OrderItem
                  key={item.id}
                  image={item.product?.productImage}
                  name={item.productName}
                  quantity={item.quantity}
                  price={item.unitPrice * item.quantity}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={orderTrackingStyles.side}>
          <Box sx={orderTrackingStyles.card}>
            <Typography sx={orderTrackingStyles.cardTitle}>Shipping to</Typography>
            <Typography sx={orderTrackingStyles.addressLine}>
              {formatAddressLine1(order.address)}
            </Typography>
            <Typography sx={orderTrackingStyles.addressLine}>
              {formatAddressLine2(order.address)}
            </Typography>
          </Box>

          <Box sx={orderTrackingStyles.card}>
            <Typography sx={orderTrackingStyles.cardTitle}>Summary</Typography>
            <Box sx={orderTrackingStyles.summaryRow}>
              <Typography sx={orderTrackingStyles.summaryLabel}>
                Subtotal · {totalQuantity} item{totalQuantity === 1 ? '' : 's'}
              </Typography>
              <Typography sx={orderTrackingStyles.summaryValue}>
                €{subtotal.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={orderTrackingStyles.summaryRow}>
              <Typography sx={orderTrackingStyles.summaryLabel}>Shipping</Typography>
              <Typography sx={orderTrackingStyles.summaryValue}>FREE</Typography>
            </Box>
            <Box sx={orderTrackingStyles.summaryRow}>
              <Typography sx={orderTrackingStyles.totalLabel}>Total</Typography>
              <Typography sx={orderTrackingStyles.totalValue}>
                €{order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { OrderTrackingPage };
