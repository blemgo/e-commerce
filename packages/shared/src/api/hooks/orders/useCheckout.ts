import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { Order } from '@shared/types';

export interface UseCheckoutReturn {
  checkout: (addressId: string) => Promise<Order>;
  isLoading: boolean;
}

const useCheckout = (): UseCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async (addressId: string): Promise<Order> => {
    setIsLoading(true);

    try {
      return await api.orders().checkout({ addressId });
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Checkout failed.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading };
};

export { useCheckout };
