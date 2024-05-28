import { request } from './request';
import { QueryParam } from '@/interfaces/common';
import { ISubscription } from '@/interfaces/subscription';
interface SubscriptionResult {
  total: number;
  data: ISubscription[];
}
export const apiListSubscription = (param: QueryParam) =>
  request<SubscriptionResult>('get', '/v1/admin/subscriptions', param);
