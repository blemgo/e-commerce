import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { ChangePasswordDTO } from '@shared/types';

export interface UseChangePasswordReturn {
  changePassword: (changePasswordDTO: ChangePasswordDTO) => Promise<void>;
  isLoading: boolean;
}

const useChangePassword = (): UseChangePasswordReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async (
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await api.users().changePassword(changePasswordDTO);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to change password.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};

export { useChangePassword };
