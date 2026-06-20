import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { getApiErrorMessage } from '@api/utils/getApiErrorMessage';
import type { UserAddress } from '@types';

export interface UseDeleteAddressReturn {
  deleteAddress: (addressId: string) => Promise<UserAddress[]>;
  isLoading: boolean;
}

const useDeleteAddress = (): UseDeleteAddressReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteAddress = async (addressId: string): Promise<UserAddress[]> => {
    setIsLoading(true);

    try {
      return await api.addresses().deleteAddress(addressId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to remove address.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAddress, isLoading };
};

export { useDeleteAddress };
