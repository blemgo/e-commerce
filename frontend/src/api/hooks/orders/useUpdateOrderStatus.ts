import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { Order, OrderStatus } from '@types';

export interface UseUpdateOrderStatusReturn {
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  isLoading: boolean;
}

const useUpdateOrderStatus = (): UseUpdateOrderStatusReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    setIsLoading(true);

    try {
      return await api.orders().updateOrderStatus(id, status);
    } catch (error) {
      toast.error('Failed to update order status.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateOrderStatus, isLoading };
};

export { useUpdateOrderStatus };
