import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { IMap } from '@/interfaces/map';
import { apiListMap } from '@/api/map.api';
interface MapState {
  loading: boolean;
  isProcessing: boolean;
  total: number;
  listMap: IMap[];
  getListMap: () => void;
}

const useMapStore = create<MapState>((set, _) => ({
  loading: false,
  isProcessing: false,
  total: 0,
  listMap: [],
  getListMap: async () => {
    set({ loading: true });
    const res = await apiListMap();
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { result } = res.data;
      set({
        listMap: result,
        total: result.length,
      });
    }
    set({ loading: false });
  },
}));

export default useMapStore;
