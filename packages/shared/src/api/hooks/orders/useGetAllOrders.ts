import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { stripNulls } from '@shared/utils/stripNulls';
import type { Order, Paginated } from '@shared/types';
import type { OrderFilters } from './useOrderFilters';

export interface UseGetAllOrdersReturn {
  paginatedOrders: Paginated<Order> | null;
  setPaginatedOrders: React.Dispatch<React.SetStateAction<Paginated<Order> | null>>;
  loading: boolean;
}

const useGetAllOrders = (filters: OrderFilters): UseGetAllOrdersReturn => {
  const [paginatedOrders, setPaginatedOrders] = useState<Paginated<Order> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrders = async () => {
      setLoading(true);

      try {
        const data = await api.orders().getAllOrders(stripNulls(filters), controller.signal);
        setPaginatedOrders(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return { paginatedOrders, setPaginatedOrders, loading };
};

export { useGetAllOrders };
