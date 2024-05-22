import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { IMap } from '@/interfaces/map';
import { apiCreateMap, apiListMap, apiUpdateMap } from '@/api/map.api';
import { Response } from '@/api/request';
interface MapState {
  loading: boolean;
  isProcessing: boolean;
  total: number;
  listMap: IMap[];
  getListMap: () => void;
  createMap: (data: Partial<IMap>) => Promise<Response>;
  updateMap: (mapId: string, data: Partial<IMap>) => Promise<Response>;
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
  createMap: async (data: Partial<IMap>) => {
    set({ loading: true });
    const res = await apiCreateMap(data);
    set({ loading: false });
    return res;
  },
  updateMap: async (mapId: string, data: Partial<IMap>) => {
    set({ loading: true });
    const res = await apiUpdateMap(mapId, data);
    set({ loading: false });
    return res;
  },
}));

export default useMapStore;
