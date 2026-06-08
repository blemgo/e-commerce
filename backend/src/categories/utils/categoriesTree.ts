import { ProductCategory } from "../entities/product-category.entity";
import { CategoryNode } from "../interfaces/CategoryNode";

export const categoryRowsToTree = (categoryRows: ProductCategory[]): CategoryNode[] => {
    const idMap = new Map<string, CategoryNode>(
        categoryRows.map(row => [row.id, { id: row.id, name: row.categoryName, children: [] }]),
    );

    const rootNodes: CategoryNode[] = [];

    // Map each category to its parent node / roots
    categoryRows.forEach(row => {
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

export const findNode = (tree: CategoryNode[], id: string): CategoryNode | null => {
    tree.forEach(node => {
        if (node.id === id) {
            return node;
        }

        const child = findNode(node.children, id);

        if (child) {
            return child;
        }
    });

    return null;
};

export const getDescendantIds = (node: CategoryNode): string[] => {
    const descendantIds: string[] = [node.id];

    node.children.forEach(child => {
        descendantIds.push(...getDescendantIds(child));
    });

    return descendantIds;
};