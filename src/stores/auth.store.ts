import { create } from 'zustand';
import Cookies from 'js-cookie';

import {
  TLoginParams,
  TTokenResult,
  apiLogin,
  apiLogout,
  apiRefreshToken,
  apiVerify,
} from '@/api/user.api';
import useGlobalStore from './global.store';

import {
  HTTP_STATUS_CODE,
  COOKIE_KEYS,
  LS_KEYS,
  ROLE,
} from '@/constants/common';
import { getLS, removeLS, setLS } from '@/utils/localStorage';
import { IUser } from '@/interfaces/user';

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_KEYS;

const { USER } = LS_KEYS;

type TAuthState = {
  isAuthenticated: boolean;
  isProcessing: boolean;
  user: IUser | null;
  role: string | null;
  reset: () => void;
  login: (params: TLoginParams) => void;
  verify: (params: TLoginParams) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

const checkIsAuthenticated = () => {
  const user = getLS(USER);
  const accessToken = Cookies.get(ACCESS_TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  if (user && accessToken && refreshToken) {
    return true;
  }
  return false;
};

export const setTokens = ({ access, refresh }: TTokenResult) => {
  Cookies.set(ACCESS_TOKEN, access);
  Cookies.set(REFRESH_TOKEN, refresh);
};

const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};

const useAuthStore = create<TAuthState>((set, get) => {
  const userData = getLS(USER) || null;
  const roleName = 'admin'; //userData ? (userData as TUser).role.name : null;
  return {
    isAuthenticated: checkIsAuthenticated(),
    isProcessing: false,
    user: userData,
    role: roleName,
    reset: () => {
      removeTokens();
      removeLS(USER);
      set({
        isAuthenticated: false,
        user: null,
        role: null,
      });
    },
    login: async (params: TLoginParams) => {
      set({ isProcessing: true });
      const res = await apiLogin(params);
      if (res?.status === HTTP_STATUS_CODE.OK) {
      }
      set({ isProcessing: false });
    },
    verify: async (params: TLoginParams) => {
      set({ isProcessing: true });
      const res = await apiVerify(params);
      if (res?.status === HTTP_STATUS_CODE.OK) {
        const { user, accessToken, refreshToken } = res.data.result;
        if (user.role != 'admin') {
          throw new Error(`Forbidden`);
        }
        setTokens({
          access: accessToken,
          refresh: refreshToken,
        });
        set({
          isAuthenticated: true,
          user: user,
          role: user.role,
        });
        setLS(USER, user);
      }
      set({ isProcessing: false });
    },
    logout: async () => {
      const { setLoading } = useGlobalStore.getState();
      setLoading(true);
      await apiLogout();
      get().reset();
      setLoading(false);
    },
    refreshToken: async () => {
      const refreshToken = Cookies.get(REFRESH_TOKEN) || '';
      if (refreshToken) await apiRefreshToken({ refreshToken });
    },
    setRole: (role: ROLE) => set({ role }),
  };
});

export default useAuthStore;
