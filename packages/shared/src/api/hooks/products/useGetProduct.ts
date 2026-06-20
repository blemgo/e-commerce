import { useEffect, useState } from 'react';
import api from '@shared/api/api';
import type { Product } from '@shared/types';

export interface UseGetProductReturn {
  product: Product | null;
  loading: boolean;
}

const useGetProduct = (productId: string): UseGetProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);

      try {
        const data = await api.products().getProduct(productId, controller.signal);
        setProduct(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [productId]);

  return { product, loading };
};

export { useGetProduct };
