import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { UserAddress } from '@shared/types';

export interface UseSetDefaultAddressReturn {
  setDefaultAddress: (addressId: string) => Promise<UserAddress[]>;
  isLoading: boolean;
}

const useSetDefaultAddress = (): UseSetDefaultAddressReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const setDefaultAddress = async (addressId: string): Promise<UserAddress[]> => {
    setIsLoading(true);

    try {
      return await api.addresses().setDefaultAddress(addressId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update default address.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { setDefaultAddress, isLoading };
};

export { useSetDefaultAddress };
