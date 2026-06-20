import { OrderStatus } from '@shared/types';

export type OrderStatusColor = 'info' | 'warning' | 'success' | 'error';

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: OrderStatusColor }
> = {
  [OrderStatus.PROCESSING]: { label: 'Processing', color: 'info' },
  [OrderStatus.SHIPPED]: { label: 'Shipped', color: 'warning' },
  [OrderStatus.DELIVERED]: { label: 'Delivered', color: 'success' },
  [OrderStatus.CANCELLED]: { label: 'Cancelled', color: 'error' },
};
