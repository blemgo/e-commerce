import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import type { Order } from '@shared/types';

export interface UseGetOrdersReturn {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  loading: boolean;
}

const useGetOrders = (): UseGetOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      setLoading(true);

      try {
        const data = await api.orders().getOrders(controller.signal);
        setOrders(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load orders.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => controller.abort();
  }, []);

  return { orders, setOrders, loading };
};

export { useGetOrders };
