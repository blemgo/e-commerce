import { useQueryStates, parseAsString, parseAsInteger, parseAsFloat, parseAsStringEnum } from 'nuqs';
import type { inferParserType } from 'nuqs';

export const productFiltersParsers = {
  category: parseAsString,
  name: parseAsString,
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  sortBy: parseAsStringEnum<'name' | 'price'>(['name', 'price']),
  sortOrder: parseAsStringEnum<'ASC' | 'DESC'>(['ASC', 'DESC']),
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(12),
};

export type ProductFilters = inferParserType<typeof productFiltersParsers>;

const useProductFilters = () => useQueryStates(productFiltersParsers);

export { useProductFilters };
