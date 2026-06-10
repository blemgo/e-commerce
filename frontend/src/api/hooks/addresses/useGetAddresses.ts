import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { UserAddress } from '@types';

export interface UseGetAddressesReturn {
  addresses: UserAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<UserAddress[]>>;
  loading: boolean;
}

const useGetAddresses = (): UseGetAddressesReturn => {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAddresses = async () => {
      setLoading(true);

      try {
        const data = await api.addresses().getAddresses(controller.signal);
        setAddresses(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          toast.error('Failed to load addresses.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAddresses();

    return () => controller.abort();
  }, []);

  return { addresses, setAddresses, loading };
};

export { useGetAddresses };
