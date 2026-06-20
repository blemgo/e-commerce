import { useGetUploadSignature } from './useGetUploadSignature';
import { useUploadImage } from './useUploadImage';

export interface UseUploadProductImageReturn {
  uploadImage: (file: File) => Promise<string>;
  isLoading: boolean;
}

const useUploadProductImage = (): UseUploadProductImageReturn => {
  const { getUploadSignature, isLoading: isSigning } = useGetUploadSignature();
  const { uploadImage: uploadToCloudinary, isLoading: isUploading } = useUploadImage();

  const uploadImage = async (file: File): Promise<string> => {
    const { signature, timestamp, apiKey, cloudName } = await getUploadSignature();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);

    return await uploadToCloudinary(cloudName, formData);
  };

  return { uploadImage, isLoading: isSigning || isUploading };
};

export { useUploadProductImage };
