import { create } from 'zustand';
import Cookies from 'js-cookie';

import {
  TLoginParams,
  TTokenResult,
  apiLogin,
  apiLogout,
  apiRefreshToken,
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
  logout: () => void;
  refreshToken: () => Promise<TTokenResult | null>;
  setRole: (role: ROLE) => void;
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
  Cookies.set(ACCESS_TOKEN, access.token);
  Cookies.set(REFRESH_TOKEN, refresh.token);
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
        const { data } = res;
        const {
          tokens: { access, refresh },
          user,
        } = data.result;
        console.log({ user });
        if (['admin'].includes(user.role)) {
          setTokens({ access, refresh });
          setLS(USER, user);
          set({
            user,
            role: user.role,
            isAuthenticated: true,
            isProcessing: false,
          });
          return;
        }
      }
      set({ isAuthenticated: false, isProcessing: false });
    },
    logout: async () => {
      const { setLoading } = useGlobalStore.getState();
      setLoading(true);
      await apiLogout();
      get().reset();
      setLoading(false);
    },
    refreshToken: async () => {
      const token = Cookies.get(REFRESH_TOKEN) || '';

      if (token) {
        const res = await apiRefreshToken({ token });

        if (res?.status === HTTP_STATUS_CODE.OK) {
          const { data } = res;
          const { access, refresh } = data.result;

          setTokens({ access, refresh });

          return data;
        }
      }

      get().reset();

      return null;
    },
    setRole: (role: ROLE) => set({ role }),
  };
});

export default useAuthStore;
