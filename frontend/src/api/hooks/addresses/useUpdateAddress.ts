import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { UpdateAddressDTO, UserAddress } from '@types';

export interface UseUpdateAddressReturn {
  updateAddress: (
    addressId: string,
    updateAddressDTO: UpdateAddressDTO,
  ) => Promise<UserAddress[]>;
  isLoading: boolean;
}

const useUpdateAddress = (): UseUpdateAddressReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateAddress = async (
    addressId: string,
    updateAddressDTO: UpdateAddressDTO,
  ): Promise<UserAddress[]> => {
    setIsLoading(true);

    try {
      return await api.addresses().updateAddress(addressId, updateAddressDTO);
    } catch (error) {
      toast.error('Failed to update address.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAddress, isLoading };
};

export { useUpdateAddress };
