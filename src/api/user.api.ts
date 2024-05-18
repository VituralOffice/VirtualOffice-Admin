import { IUser } from '@/interfaces/user';
import { Response, request } from './request';
// type params
export type TLoginParams = {
  email: string;
  password: string;
};
type TRefreshParams = {
  token: string;
};
export type QueryUserParams = {
  page: number;
  limit?: number;
  role?: string;
  q?: string;
};
export type TTokenPair = {
  token: string;
  expires: string;
};
// type result
export type TTokenResult = {
  access: TTokenPair;
  refresh: TTokenPair;
};

export type TLoginResult = {
  user: IUser;
  tokens: TTokenResult;
};

type QueryUserResult = {
  data: IUser[];
  page: number;
  total: number;
  limit: number;
};
export const apiLogin = (params: TLoginParams) =>
  request<TLoginResult>('post', '/auth/login', params);
export const apiLogout = () => request<Response>('post', '/auth/logout');
export const apiRefreshToken = (params: TRefreshParams) =>
  request<TTokenResult>('post', '/auth/refresh', params);
export const apiListUser = (params: QueryUserParams) =>
  request<QueryUserResult>('get', '/users', params);
export const apiUpdateUser = (id: number, body: Partial<IUser>) =>
  request('patch', `/users/${id}`, body);
export const apiCreateUser = (data: Partial<IUser>) =>
  request('post', `/users`, data);
