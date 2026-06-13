import { useCreateProduct } from "@api/hooks/products/useCreateProduct";
import { useUpdateProduct } from "@api/hooks/products/useUpdateProduct";
import type { CreateProductDTO, Paginated, Product } from "@types";

export interface UseSubmitProductReturn {
  submitProduct: (editing: Product | undefined, dto: CreateProductDTO) => Promise<boolean>;
  isSaving: boolean;
}

const useSubmitProduct = (
  setProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>,
): UseSubmitProductReturn => {
  const { createProduct, isLoading: creating } = useCreateProduct();
  const { updateProduct, isLoading: updating } = useUpdateProduct();

  const submitProduct = async (
    editing: Product | undefined,
    dto: CreateProductDTO,
  ): Promise<boolean> => {
    try {
      if (editing) {
        const updated = await updateProduct(editing.id, dto);
        setProducts(prev =>
          prev
            ? { ...prev, data: prev.data.map(p => (p.id === updated.id ? updated : p)) }
            : prev,
        );
      } else {
        const created = await createProduct(dto);
        setProducts(prev =>
          prev
            ? { ...prev, data: [created, ...prev.data], totalCount: prev.totalCount + 1 }
            : prev,
        );
      }

      return true;
    } catch {
      return false;
    }
  };

  return { submitProduct, isSaving: creating || updating };
};

export { useSubmitProduct };
