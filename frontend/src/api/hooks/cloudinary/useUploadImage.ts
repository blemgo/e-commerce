import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '@api/api';

export interface UseUploadImageReturn {
  uploadImage: (cloudName: string, formData: FormData) => Promise<string>;
  isLoading: boolean;
}

const useUploadImage = (): UseUploadImageReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (cloudName: string, formData: FormData): Promise<string> => {
    setIsLoading(true);

    try {
      const result = await api.cloudinary().uploadImage(cloudName, formData);

      return result.secure_url;
    } catch (error) {
      toast.error('Failed to upload image.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadImage, isLoading };
};

export { useUploadImage };
