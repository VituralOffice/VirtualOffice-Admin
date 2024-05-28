import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { IPlan } from '@/interfaces/plan';
import { apiListPlan } from '@/api/plan.api';
import { QueryParam } from '@/interfaces/common';
interface PlanState {
  loading: boolean;
  isProcessing: boolean;
  param: QueryParam;
  total: number;
  listPlan: IPlan[];
  getListPlan: () => void;
  setParam: (p: QueryParam) => void;
}

const usePlanStore = create<PlanState>((set, get) => ({
  loading: false,
  isProcessing: false,
  param: { page: 1, q: '' },
  total: 0,
  listPlan: [],
  getListPlan: async () => {
    set({ loading: true });
    const res = await apiListPlan(get().param);
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { result } = res.data;
      set({
        listPlan: result,
        total: result.length,
      });
    }
    set({ loading: false });
  },
  setParam: (p: QueryParam) => {
    set({ param: { ...get().param, ...p } });
  },
}));

export default usePlanStore;
