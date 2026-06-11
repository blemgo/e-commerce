import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { LocalRegisterDTO, AuthUser } from '@types';

export interface UseLocalRegisterReturn {
  localRegister: (dto: LocalRegisterDTO) => Promise<AuthUser>;
  isLoading: boolean;
}

const useLocalRegister = (): UseLocalRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const localRegister = async (dto: LocalRegisterDTO): Promise<AuthUser> => {
    setIsLoading(true);

    try {
      const response = await api.auth().localRegister(dto);

      return response;
    } catch {
      toast.error('Registration failed. Please try again.');

      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { localRegister, isLoading };
};

export default useLocalRegister;
