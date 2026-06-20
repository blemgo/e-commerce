import { useQueryStates, parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs';
import type { inferParserType } from 'nuqs';
import { OrderStatus } from '@shared/types';

export const orderFiltersParsers = {
  status: parseAsStringEnum<OrderStatus>(Object.values(OrderStatus)),
  search: parseAsString,
  page: parseAsInteger.withDefault(1),
};

export type OrderFilters = inferParserType<typeof orderFiltersParsers>;

const useOrderFilters = () => useQueryStates(orderFiltersParsers);

export { useOrderFilters };
