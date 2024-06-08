import { IUser } from '@/interfaces/user';
import { Response, request } from './request';
// type params
export type TLoginParams = {
  email: string;
  otp?: string;
};
type TRefreshParams = {
  refreshToken: string;
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
  access: string;
  refresh: string;
};

export type TLoginResult = {
  user: IUser;
  tokens: TTokenResult;
};
export type TVerifyResult = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};
type QueryUserResult = {
  data: IUser[];
  page: number;
  total: number;
  limit: number;
};
export const apiLogin = (params: TLoginParams) =>
  request<TLoginResult>('post', '/v1/auth/login', params);
export const apiVerify = (params: TLoginParams) =>
  request<TVerifyResult>('post', '/v1/auth/verify', params);
export const apiLogout = () => request<Response>('post', '/v1/auth/logout');
export const apiRefreshToken = (params: TRefreshParams) =>
  request<TTokenResult>('post', '/v1/auth/refresh', params);
export const apiListUser = (params: QueryUserParams) =>
  request<QueryUserResult>('get', '/v1/admin/users', params);
export const apiUpdateUser = (id: number, body: Partial<IUser>) =>
  request('patch', `/users/${id}`, body);
export const apiCreateUser = (data: Partial<IUser>) =>
  request('post', `/users`, data);
