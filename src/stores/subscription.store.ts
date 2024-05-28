import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { ISubscription } from '@/interfaces/subscription';
import { apiListSubscription } from '@/api/subscription.api';
import { QueryParam } from '@/interfaces/common';
interface SubscriptionState {
  loading: boolean;
  isProcessing: boolean;
  param: QueryParam;
  total: number;
  listSubscription: ISubscription[];
  getListSubscription: () => void;
  setParam: (p: QueryParam) => void;
}

const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  loading: false,
  isProcessing: false,
  param: { page: 1, q: '' },
  total: 0,
  listSubscription: [],
  getListSubscription: async () => {
    set({ loading: true });
    const res = await apiListSubscription(get().param);
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { result } = res.data;
      set({
        listSubscription: result.data,
        total: result.total,
      });
    }
    set({ loading: false });
  },
  setParam: (p: QueryParam) => {
    set({ param: { ...get().param, ...p } });
  },
}));

export default useSubscriptionStore;
