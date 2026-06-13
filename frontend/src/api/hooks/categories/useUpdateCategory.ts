import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { CategoryNode, UpdateCategoryDTO } from '@types';

export interface UseUpdateCategoryReturn {
  updateCategory: (id: string, updateCategoryDTO: UpdateCategoryDTO) => Promise<CategoryNode[]>;
  isLoading: boolean;
}

const useUpdateCategory = (): UseUpdateCategoryReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateCategory = async (
    id: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<CategoryNode[]> => {
    setIsLoading(true);

    try {
      return await api.categories().updateCategory(id, updateCategoryDTO);
    } catch (error) {
      toast.error('Failed to update category.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCategory, isLoading };
};

export { useUpdateCategory };
