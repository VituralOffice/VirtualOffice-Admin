import { ROLE } from '@/constants/common';
import { TShop } from './shop';
import { TMerchant } from './merchant';

export type TRole = {
  id: number;
  name: ROLE;
};

export type TPoint = {
  id: number;
  user_id: number;
  shop_id: TShop['id'];
  total: number;
};

export type TUser = {
  id: number;
  phone_number: string;
  phone_code: string;
  first_name: string;
  last_name: string;
  birthday: string;
  avatar: string;
  active: boolean | string;
  is_verified: boolean;
  email?: string;
  role_id: number;
  role: TRole;
  merchant_id?: TMerchant['id'];
  shop_id: number | null;
  point: TPoint | null;
  password?: string;
  created_at?: string;
};
export interface IUser {
  user_id: number;
  fullname: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
  type: string;
  birthday: string;
}
