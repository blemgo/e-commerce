import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { Paginated, Product, ProductFilters } from '@types';
import api from '@api/api';

export interface UseGetProductsReturn {
  paginatedProducts: Paginated<Product> | null;
  setPaginatedProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>;
  loading: boolean;
}

const useGetProducts = (filters?: ProductFilters): UseGetProductsReturn => {
  const [paginatedProducts, setPaginatedProducts] = useState<Paginated<Product> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await api.products().getProducts(filters);
        setPaginatedProducts(data);
      } catch {
        toast.error('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { paginatedProducts, setPaginatedProducts, loading };
};

export { useGetProducts };
