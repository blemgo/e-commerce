export interface CategoryNode {
  id: string;
  name: string;
  parentId: string | null;
  children: CategoryNode[];
}

export interface CreateCategoryDTO {
  categoryName: string;
  parentCategoryId?: string | null;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
