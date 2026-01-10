export interface ResponseObject<T> {
  success: boolean;
  failed: boolean;
  data: T | null;
  error: string;
}