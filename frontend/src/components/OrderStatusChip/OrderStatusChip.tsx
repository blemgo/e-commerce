import Chip from '@mui/material/Chip';
import { OrderStatus } from '@types';
import { orderStatusChipStyles } from './OrderStatusChip.styles';

type StatusColor = 'info' | 'warning' | 'success' | 'error';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: StatusColor }> = {
  [OrderStatus.PROCESSING]: { label: 'Processing', color: 'info' },
  [OrderStatus.SHIPPED]: { label: 'Shipped', color: 'warning' },
  [OrderStatus.DELIVERED]: { label: 'Delivered', color: 'success' },
  [OrderStatus.CANCELLED]: { label: 'Cancelled', color: 'error' },
};

interface OrderStatusChipProps {
  status: OrderStatus;
}

const OrderStatusChip = ({ status }: OrderStatusChipProps) => {
  const { label, color } = STATUS_CONFIG[status];

  return (
    <Chip
      label={label}
      color={color}
      size="small"
      variant="outlined"
      sx={orderStatusChipStyles.chip}
    />
  );
};

export { OrderStatusChip };
