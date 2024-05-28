import { IPlan } from './plan';
import { IUser } from './user';

export interface ISubscription {
  _id: string;
  user: IUser;
  freePlan: boolean;
  plan: IPlan;
  billingCycle: string;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}
