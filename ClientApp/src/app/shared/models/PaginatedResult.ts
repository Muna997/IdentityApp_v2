export interface PaginatedResult<T> {
  items: T[];
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
