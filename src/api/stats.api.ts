import { request } from './request';

export interface DashboardStat {
  totalMap: number;
  totalUser: number;
  totalPlan: number;
  totalRoom: number;
  totalSubscription: number;
}
export interface UserStat {
  count: number;
  date: Date;
}
export const apiStats = () => request<DashboardStat>('get', '/v1/admin/stats');
export const apiUserStats = (startDate: string) =>
  request<UserStat[]>('get', `/v1/admin/stats/user?startDate=${startDate}`);
