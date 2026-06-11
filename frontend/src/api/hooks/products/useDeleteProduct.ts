import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';

export interface UseDeleteProductReturn {
  deleteProduct: (id: string) => Promise<void>;
  isLoading: boolean;
}

const useDeleteProduct = (): UseDeleteProductReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (id: string): Promise<void> => {
    setIsLoading(true);

    try {
      await api.products().deleteProduct(id);
    } catch (error) {
      toast.error('Failed to delete product.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct, isLoading };
};

export { useDeleteProduct };
