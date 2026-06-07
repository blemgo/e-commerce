import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import type { User, LocalLoginDTO } from '@types';

export interface UseLocalLoginReturn {
  localLogin: (dto: LocalLoginDTO) => Promise<User>;
  isLoading: boolean;
}

const useLocalLogin = (): UseLocalLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const localLogin = async (dto: LocalLoginDTO): Promise<User> => {
    setIsLoading(true);

    try {
      const user = await api.auth().localLogin(dto);

      return user;
    } catch {
      toast.error('Login failed. Please try again.');

      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { localLogin, isLoading };
};

export default useLocalLogin;
