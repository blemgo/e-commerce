import { useDeleteCategory } from "@shared/api/hooks/categories/useDeleteCategory";
import type { CategoryNode } from "@shared/types";

export interface UseRemoveCategoryReturn {
  removeCategory: (category: CategoryNode) => Promise<void>;
  isRemoving: boolean;
}

const useRemoveCategory = (
  setCategories: React.Dispatch<React.SetStateAction<CategoryNode[]>>,
): UseRemoveCategoryReturn => {
  const { deleteCategory, isLoading: isRemoving } = useDeleteCategory();

  const removeCategory = async (category: CategoryNode): Promise<void> => {
    const tree = await deleteCategory(category.id);

    setCategories(tree);
  };

  return { removeCategory, isRemoving };
};

export { useRemoveCategory };
