import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { CreateProductDTO, Product } from '@types';

export interface UseCreateProductReturn {
  createProduct: (createProductDTO: CreateProductDTO) => Promise<Product>;
  isLoading: boolean;
}

const useCreateProduct = (): UseCreateProductReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createProduct = async (createProductDTO: CreateProductDTO): Promise<Product> => {
    setIsLoading(true);

    try {
      return await api.products().createProduct(createProductDTO);
    } catch (error) {
      toast.error('Failed to create product.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProduct, isLoading };
};

export { useCreateProduct };
