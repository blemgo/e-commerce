import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';
import { getApiErrorMessage } from '@api/utils/getApiErrorMessage';
import type { CloudinaryUploadSignature } from '@types';

export interface UseGetUploadSignatureReturn {
  getUploadSignature: () => Promise<CloudinaryUploadSignature>;
  isLoading: boolean;
}

const useGetUploadSignature = (): UseGetUploadSignatureReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const getUploadSignature = async (): Promise<CloudinaryUploadSignature> => {
    setIsLoading(true);

    try {
      return await api.cloudinary().getUploadSignature();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to prepare image upload.'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { getUploadSignature, isLoading };
};

export { useGetUploadSignature };
