import { useDeleteProduct } from "@shared/api/hooks/products/useDeleteProduct";
import type { Paginated, Product } from "@shared/types";

export interface UseRemoveProductReturn {
  removeProduct: (product: Product) => Promise<void>;
  isRemoving: boolean;
}

const useRemoveProduct = (
  setProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>,
): UseRemoveProductReturn => {
  const { deleteProduct, isLoading: isRemoving } = useDeleteProduct();

  const removeProduct = async (product: Product): Promise<void> => {
    await deleteProduct(product.id);
    setProducts(prev =>
      prev
        ? {
            ...prev,
            data: prev.data.filter(p => p.id !== product.id),
            totalCount: prev.totalCount - 1,
          }
        : prev,
    );
  };

  return { removeProduct, isRemoving };
};

export { useRemoveProduct };
