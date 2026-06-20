import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import type { Order } from '@shared/types';

export interface UseGetOrderReturn {
  order: Order | null;
  loading: boolean;
}

const useGetOrder = (orderId: string): UseGetOrderReturn => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrder = async () => {
      setLoading(true);

      try {
        const data = await api.orders().getOrder(orderId, controller.signal);
        setOrder(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load order.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => controller.abort();
  }, [orderId]);

  return { order, loading };
};

export { useGetOrder };
