export class CategoryNodeDto {
  id: string;
  name: string;
  parentId: string | null;
  children: CategoryNodeDto[];
}
