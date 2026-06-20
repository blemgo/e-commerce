import { useCreateCategory } from "@shared/api/hooks/categories/useCreateCategory";
import { useUpdateCategory } from "@shared/api/hooks/categories/useUpdateCategory";
import type { CategoryNode, CreateCategoryDTO } from "@shared/types";

export interface UseSaveCategoryReturn {
  saveCategory: (
    editing: CategoryNode | undefined,
    dto: CreateCategoryDTO,
  ) => Promise<void>;
  isSaving: boolean;
}

const useSaveCategory = (
  setCategories: React.Dispatch<React.SetStateAction<CategoryNode[]>>,
): UseSaveCategoryReturn => {
  const { createCategory, isLoading: creating } = useCreateCategory();
  const { updateCategory, isLoading: updating } = useUpdateCategory();

  const saveCategory = async (
    editing: CategoryNode | undefined,
    dto: CreateCategoryDTO,
  ): Promise<void> => {
    const tree = editing
      ? await updateCategory(editing.id, dto)
      : await createCategory(dto);

    setCategories(tree);
  };

  return { saveCategory, isSaving: creating || updating };
};

export { useSaveCategory };
