import { TShop } from './shop';

export type TGetListResult<T> = {
  page: number;
  total: number;
  data: T[];
};

export type TImage = {
  id: number;
  path: string;
  is_main?: boolean;
  shop_id?: TShop['id'];
};
