import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { getApiErrorMessage } from '@api/utils/getApiErrorMessage';
import { isUnauthorizedError } from '@/utils/getResponseStatus';
import type { LocalLoginDTO, AuthUser } from '@types';

export interface UseLocalLoginReturn {
  localLogin: (dto: LocalLoginDTO) => Promise<AuthUser>;
  isLoading: boolean;
}

const useLocalLogin = (): UseLocalLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const localLogin = async (dto: LocalLoginDTO): Promise<AuthUser> => {
    setIsLoading(true);

    try {
      const user = await api.auth().localLogin(dto);

      return user;
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        toast.error(getApiErrorMessage(error, 'Login failed. Please try again.'));
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { localLogin, isLoading };
};

export default useLocalLogin;
