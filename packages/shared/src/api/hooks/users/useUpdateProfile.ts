import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@shared/api/api';
import { getApiErrorMessage } from '@shared/api/utils/getApiErrorMessage';
import type { UpdateProfileDTO, UserProfile } from '@shared/types';

export interface UseUpdateProfileReturn {
  updateProfile: (updateProfileDTO: UpdateProfileDTO) => Promise<UserProfile>;
  isLoading: boolean;
}

const useUpdateProfile = (): UseUpdateProfileReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (
    updateProfileDTO: UpdateProfileDTO,
  ): Promise<UserProfile> => {
    setIsLoading(true);

    try {
      return await api.users().updateProfile(updateProfileDTO);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update profile.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading };
};

export { useUpdateProfile };
