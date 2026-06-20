import type { CategoryNode } from "@shared/types";

export interface CategoryOption {
  id: string;
  name: string;
  path: string[];
}

export const flattenWithPath = (
  nodes: CategoryNode[],
  ancestors: string[] = [],
): CategoryOption[] =>
  nodes.flatMap(node => [
    { id: node.id, name: node.name, path: ancestors },
    ...flattenWithPath(node.children, [...ancestors, node.name]),
  ]);

export const formatPath = (option: CategoryOption): string =>
  [...option.path, option.name].join(" › ");
