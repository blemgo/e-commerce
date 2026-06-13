import { useState } from 'react';

export interface UseUploadProductImageReturn {
  uploadImage: (file: File) => Promise<string>;
  isLoading: boolean;
}

const useUploadProductImage = (): UseUploadProductImageReturn => {
  const [isLoading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    void file;

    return '';
  };

  return { uploadImage, isLoading };
};

export { useUploadProductImage };
