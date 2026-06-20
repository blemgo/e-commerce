import Chip from '@mui/material/Chip';
import { OrderStatus } from '@shared/types';
import { ORDER_STATUS_CONFIG } from '@shared/utils/orderStatus';
import { orderStatusChipStyles } from './OrderStatusChip.styles';

interface OrderStatusChipProps {
  status: OrderStatus;
}

const OrderStatusChip: React.FC<OrderStatusChipProps> = ({ status }: OrderStatusChipProps) => {
  const { label, color } = ORDER_STATUS_CONFIG[status];

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
