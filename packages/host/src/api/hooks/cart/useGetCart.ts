import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { Cart } from '@types';

export interface UseGetCartReturn {
  getCart: () => Promise<Cart>;
  isLoading: boolean;
}

const useGetCart = (): UseGetCartReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async (): Promise<Cart> => {
    setIsLoading(true);

    try {
      return await api.cart().getCart();
    } catch (error) {
      toast.error('Failed to load cart.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { getCart, isLoading };
};

export { useGetCart };
