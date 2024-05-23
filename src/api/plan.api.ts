import { request } from './request';
import { QueryParam } from '@/interfaces/common';
import { IPlan } from '@/interfaces/plan';
type PlanResult = IPlan[];
export const apiListPlan = (param: QueryParam) =>
  request<PlanResult>('get', '/v1/plans', param);
