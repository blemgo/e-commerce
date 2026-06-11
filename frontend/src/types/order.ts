import type { Address } from './address';
import type { Product } from './product';

export const OrderStatus = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  id: string;
  product: Product;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  trackingId: string;
  totalAmount: number;
  items: OrderItem[];
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutDTO {
  addressId: string;
}

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
}

export interface GetAllOrdersParams {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}
