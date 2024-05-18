import { create } from 'zustand';

import { apiCreateUser, apiListUser, apiUpdateUser } from '@/api/user.api';

import { HTTP_STATUS_CODE, PAGE_LIMIT } from '@/constants/common';
import { QueryUserParams } from '@/api/user.api';
import { IUser } from '@/interfaces/user';
import { Response } from '@/api/request';
type TUserState = {
  loading: boolean;
  isProcessing: boolean;
  params: QueryUserParams;
  total: number;
  listUser: IUser[];
  setParams: (params: QueryUserParams) => void;
  resetParams: () => void;
  getListUser: () => void;
  updateUser: (userId: number, body: Partial<IUser>) => Promise<Response<any>>;
  createUser: (data: Partial<IUser>) => Promise<Response<any>>;
};

const initialParams: QueryUserParams = { page: 1, limit: PAGE_LIMIT };

const useUserStore = create<TUserState>((set, get) => ({
  loading: false,
  isProcessing: false,
  params: initialParams,
  total: 0,
  listUser: [],
  listAdmin: [],
  setParams: (p: QueryUserParams) => {
    const currentParams = get().params;
    set({ params: { ...currentParams, ...p } });
  },
  resetParams: () => set({ params: initialParams }),
  getListUser: async () => {
    set({ loading: true });
    const params = get().params;
    const res = await apiListUser(params);
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { data } = res;
      set({
        listUser: data.result.data,
        total: data.result.total,
      });
    }
    set({ loading: false });
  },
  async updateUser(userId: number, body: Partial<IUser>) {
    set({ loading: true });
    const res = await apiUpdateUser(userId, body);
    set({ loading: false });
    return res;
  },
  async createUser(data: Partial<IUser>) {
    set({ loading: true });
    const res = await apiCreateUser(data);
    set({ loading: false });
    return res;
  },
}));

export default useUserStore;
