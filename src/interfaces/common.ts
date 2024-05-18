export type TGetListResult<T> = {
  page: number;
  total: number;
  data: T[];
};
export interface QueryParam {
  page: number;
  limit?: number;
  q?: string;
}
