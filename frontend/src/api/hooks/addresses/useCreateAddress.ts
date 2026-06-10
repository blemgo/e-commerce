import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { CreateAddressDTO, UserAddress } from '@types';

export interface UseCreateAddressReturn {
  createAddress: (createAddressDTO: CreateAddressDTO) => Promise<UserAddress[]>;
  isLoading: boolean;
}

const useCreateAddress = (): UseCreateAddressReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createAddress = async (
    createAddressDTO: CreateAddressDTO,
  ): Promise<UserAddress[]> => {
    setIsLoading(true);

    try {
      return await api.addresses().createAddress(createAddressDTO);
    } catch (error) {
      toast.error('Failed to create address.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createAddress, isLoading };
};

export { useCreateAddress };
