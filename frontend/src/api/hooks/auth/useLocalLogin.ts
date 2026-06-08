import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { isUnauthorizedError } from '@/utils/getResponseStatus';
import type { LocalLoginDTO, LocalLoginResponse } from '@types';

export interface UseLocalLoginReturn {
  localLogin: (dto: LocalLoginDTO) => Promise<LocalLoginResponse>;
  isLoading: boolean;
}

const useLocalLogin = (): UseLocalLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const localLogin = async (dto: LocalLoginDTO): Promise<LocalLoginResponse> => {
    setIsLoading(true);

    try {
      const {user, accessToken} = await api.auth().localLogin(dto);

      return { user, accessToken };
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toast.error('Login failed. Please try again.');
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { localLogin, isLoading };
};

export default useLocalLogin;
