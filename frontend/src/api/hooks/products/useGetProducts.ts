import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { stripNulls } from '@/utils/stripNulls';
import type { Paginated, Product } from '@types';
import type { ProductFilters } from './useProductFilters';

export interface UseGetProductsReturn {
  paginatedProducts: Paginated<Product> | null;
  setPaginatedProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>;
  loading: boolean;
}

const useGetProducts = (filters: ProductFilters): UseGetProductsReturn => {
  const [paginatedProducts, setPaginatedProducts] = useState<Paginated<Product> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await api.products().getProducts(stripNulls(filters), controller.signal);
        setPaginatedProducts(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load products.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return { paginatedProducts, setPaginatedProducts, loading };
};

export { useGetProducts };
