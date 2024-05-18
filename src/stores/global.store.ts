import { create } from 'zustand';

type TGlobalState = {
  loading: boolean;
  siderCollapsed: boolean;
  setLoading: (loading: boolean) => void;
  setSiderCollapsed: (collapsed: boolean) => void;
};

const useGlobalStore = create<TGlobalState>((set) => ({
  loading: false,
  siderCollapsed: false,
  setLoading: (loading: boolean) => set({ loading }),
  setSiderCollapsed: (collapsed: boolean) => set({ siderCollapsed: collapsed }),
}));

export default useGlobalStore;
