export interface GetUsersParams {
  [key: string]: string | number | boolean;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  searchBy: string;
  csvRoles: string;
  lockUnlock: string;
  activation: string;
}
