import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { UpdateAddressDTO, UserAddress } from '@shared/types';

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
      toast.error(getApiErrorMessage(error, 'Failed to update address.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAddress, isLoading };
};

export { useUpdateAddress };
