import { create } from 'zustand';
import { HTTP_STATUS_CODE } from '@/constants/common';
import { IRoom } from '@/interfaces/room';
import { apiListRoom } from '@/api/room.api';
import { QueryParam } from '@/interfaces/common';
interface RoomState {
  loading: boolean;
  isProcessing: boolean;
  param: QueryParam;
  total: number;
  listRoom: IRoom[];
  getListRoom: () => void;
  setParam: (p: QueryParam) => void;
}

const useRoomStore = create<RoomState>((set, get) => ({
  loading: false,
  isProcessing: false,
  param: { page: 1, q: '' },
  total: 0,
  listRoom: [],
  getListRoom: async () => {
    set({ loading: true });
    const res = await apiListRoom(get().param);
    if (res.status === HTTP_STATUS_CODE.OK) {
      const { result } = res.data;
      set({
        listRoom: result.data,
        total: result.total,
      });
    }
    set({ loading: false });
  },
  setParam: (p: QueryParam) => {
    set({ param: { ...get().param, ...p } });
  },
}));

export default useRoomStore;
