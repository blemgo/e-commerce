export interface Paginated<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
}
