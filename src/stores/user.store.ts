import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { IUser } from '@/interfaces/user';
import { apiListUser } from '@/api/user.api';
import { QueryParam } from '@/interfaces/common';
interface UserState {
  loading: boolean;
  isProcessing: boolean;
  param: QueryParam;
  total: number;
  listUser: IUser[];
  getListUser: () => void;
  setParam: (p: QueryParam) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  loading: false,
  isProcessing: false,
  param: { page: 1, q: '', role: 'user' },
  total: 0,
  listUser: [],
  getListUser: async () => {
    set({ loading: true });
    const res = await apiListUser(get().param);
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { result } = res.data;
      set({
        listUser: result.data,
        total: result.total,
      });
    }
    set({ loading: false });
  },
  setParam: (p: QueryParam) => {
    set({ param: { ...get().param, ...p } });
  },
}));

export default useUserStore;
