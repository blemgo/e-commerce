import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { CategoryNode, CreateCategoryDTO } from '@shared/types';

export interface UseCreateCategoryReturn {
  createCategory: (createCategoryDTO: CreateCategoryDTO) => Promise<CategoryNode[]>;
  isLoading: boolean;
}

const useCreateCategory = (): UseCreateCategoryReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async (
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<CategoryNode[]> => {
    setIsLoading(true);

    try {
      return await api.categories().createCategory(createCategoryDTO);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create category.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createCategory, isLoading };
};

export { useCreateCategory };
