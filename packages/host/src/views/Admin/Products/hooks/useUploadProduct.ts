import { useUploadProductImage } from "@api/hooks/cloudinary/useUploadProductImage";
import { useCreateProduct } from "@api/hooks/products/useCreateProduct";
import { useUpdateProduct } from "@api/hooks/products/useUpdateProduct";
import type { CreateProductDTO, Paginated, Product } from "@types";

export interface UseUploadProductReturn {
  uploadProduct: (
    editing: Product | undefined,
    dto: CreateProductDTO,
    imageFile: File | null,
  ) => Promise<void>;
  isSaving: boolean;
}

const useUploadProduct = (
  setProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>,
): UseUploadProductReturn => {
  const { uploadImage, isLoading: uploadingImage } = useUploadProductImage();
  const { createProduct, isLoading: creating } = useCreateProduct();
  const { updateProduct, isLoading: updating } = useUpdateProduct();

  const uploadProduct = async (
    editing: Product | undefined,
    dto: CreateProductDTO,
    imageFile: File | null,
  ): Promise<void> => {
    let productImage = editing?.productImage;

    if (imageFile) {
      productImage = await uploadImage(imageFile);
    }

    const payload = { ...dto, productImage };

    if (editing) {
      const updated = await updateProduct(editing.id, payload);
      setProducts(prev =>
        prev
          ? { ...prev, data: prev.data.map(p => (p.id === updated.id ? updated : p)) }
          : prev,
      );
    } else {
      const created = await createProduct(payload);
      setProducts(prev =>
        prev
          ? { ...prev, data: [created, ...prev.data], totalCount: prev.totalCount + 1 }
          : prev,
      );
    }
  };

  return { uploadProduct, isSaving: uploadingImage || creating || updating };
};

export { useUploadProduct };
