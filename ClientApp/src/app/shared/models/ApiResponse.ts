export interface ApiResponse<T> {
  statusCode: number;
  title: string;
  message: string;
  details: string | null;
  isHtmlEnabled: boolean;
  displayByDefault: boolean;
  showWithToastr: boolean;
  data: T;
  errors: string[] | null;
}
