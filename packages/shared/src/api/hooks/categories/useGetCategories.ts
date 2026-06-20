import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import type { CategoryNode } from '@shared/types';

export interface UseGetCategoriesReturn {
  categories: CategoryNode[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryNode[]>>;
  loading: boolean;
}

const useGetCategories = (): UseGetCategoriesReturn => {
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setLoading(true);

      try {
        const data = await api.categories().getCategoryTree(controller.signal);
        setCategories(data);
      } catch {
        if (!controller.signal.aborted) {
          toast.error('Failed to load categories.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  return { categories, setCategories, loading };
};

export { useGetCategories };
