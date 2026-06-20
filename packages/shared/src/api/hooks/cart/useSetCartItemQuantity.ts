import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { Cart } from '@shared/types';

export interface UseSetCartItemQuantityReturn {
  setItemQuantity: (productId: string, quantity: number) => Promise<Cart>;
  isLoading: boolean;
}

const useSetCartItemQuantity = (): UseSetCartItemQuantityReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const setItemQuantity = async (productId: string, quantity: number): Promise<Cart> => {
    setIsLoading(true);

    try {
      return await api.cart().setItemQuantity(productId, quantity);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update cart.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { setItemQuantity, isLoading };
};

export { useSetCartItemQuantity };
