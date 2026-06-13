import { useDeleteProduct } from "@api/hooks/products/useDeleteProduct";
import type { Paginated, Product } from "@types";

export interface UseRemoveProductReturn {
  removeProduct: (product: Product) => Promise<boolean>;
  isRemoving: boolean;
}

const useRemoveProduct = (
  setProducts: React.Dispatch<React.SetStateAction<Paginated<Product> | null>>,
): UseRemoveProductReturn => {
  const { deleteProduct, isLoading: isRemoving } = useDeleteProduct();

  const removeProduct = async (product: Product): Promise<boolean> => {
    try {
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

      return true;
    } catch {
      return false;
    }
  };

  return { removeProduct, isRemoving };
};

export { useRemoveProduct };
