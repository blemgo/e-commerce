export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
}
