import { ProductCategory } from '../entities/product-category.entity';
import { CategoryNodeDto } from '../dto/category-node.dto';

export const categoryRowsToTree = (
  categoryRows: ProductCategory[],
): CategoryNodeDto[] => {
  const idMap = new Map<string, CategoryNodeDto>(
    categoryRows.map((row) => [
      row.id,
      {
        id: row.id,
        name: row.categoryName,
        parentId: row.parentCategoryId,
        children: [],
      },
    ]),
  );

  const rootNodes: CategoryNodeDto[] = [];

  // Map each category to its parent node / roots
  categoryRows.forEach((row) => {
    const node = idMap.get(row.id)!;

    if (!row.parentCategoryId) {
      rootNodes.push(node);
    } else {
      const parentNode = idMap.get(row.parentCategoryId)!;
      parentNode.children.push(node);
    }
  });

  return rootNodes;
};

export const findNode = (
  tree: CategoryNodeDto[],
  id: string,
): CategoryNodeDto | null => {
  for (const node of tree) {
    if (node.id === id) return node;

    const child = findNode(node.children, id);

    if (child) return child;
  }

  return null;
};

export const getDescendantIds = (node: CategoryNodeDto): string[] => {
  const descendantIds: string[] = [node.id];

  node.children.forEach((child) => {
    descendantIds.push(...getDescendantIds(child));
  });

  return descendantIds;
};
