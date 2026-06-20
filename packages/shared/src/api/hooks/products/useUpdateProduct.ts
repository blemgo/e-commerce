import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { Product, UpdateProductDTO } from '@shared/types';

export interface UseUpdateProductReturn {
  updateProduct: (id: string, updateProductDTO: UpdateProductDTO) => Promise<Product>;
  isLoading: boolean;
}

const useUpdateProduct = (): UseUpdateProductReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProduct = async (
    id: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> => {
    setIsLoading(true);

    try {
      return await api.products().updateProduct(id, updateProductDTO);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update product.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading };
};

export { useUpdateProduct };
