import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { User, LocalRegisterDTO } from '@types';

export interface UseLocalRegisterReturn {
  localRegister: (dto: LocalRegisterDTO) => Promise<User | null>;
  isLoading: boolean;
}

const useLocalRegister = (): UseLocalRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const localRegister = async (dto: LocalRegisterDTO): Promise<User | null> => {
    setIsLoading(true);

    try {
      const user = await api.auth().localRegister(dto);

      return user;
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
