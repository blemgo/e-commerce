import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { getApiErrorMessage } from '@api/utils/getApiErrorMessage';
import type { CategoryNode } from '@types';

export interface UseDeleteCategoryReturn {
  deleteCategory: (id: string) => Promise<CategoryNode[]>;
  isLoading: boolean;
}

const useDeleteCategory = (): UseDeleteCategoryReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteCategory = async (id: string): Promise<CategoryNode[]> => {
    setIsLoading(true);

    try {
      return await api.categories().deleteCategory(id);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete category.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCategory, isLoading };
};

export { useDeleteCategory };
