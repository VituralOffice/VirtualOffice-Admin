import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { message as $message } from 'antd';
import { API_URL } from './constant';
import { COOKIE_KEYS, LS_KEYS } from '@/constants/common';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  timeout: 300000,
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshingToken: boolean = false;
let requestQueue: (() => void)[] = [];
axiosInstance.interceptors.request.use(
  (config) => {
    const headers = {
      accept: 'application/json',
    };
    config.headers = Object.assign(config.headers || {}, headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      status: 200,
      data: response?.data?.data || response.data,
    } as AxiosResponse;
  },
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const errorMessage = error?.response?.data?.error || 'Error';
    if (status === 401 && error?.response?.data?.message === 'token expired' && !originalRequest._retry) {
      if (!isRefreshingToken) {
        originalRequest._retry = true;
        isRefreshingToken = true;
        try {
          const rt = localStorage.getItem(COOKIE_KEYS.REFRESH_TOKEN) || '';
          const { refreshToken } = await apiRefreshToken(rt);
          localStorage.setItem(COOKIE_KEYS.REFRESH_TOKEN, refreshToken);
        } catch (error) {
          localStorage.removeItem(COOKIE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(LS_KEYS.USER);
          Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
          Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
          window.location.href = '/';
        }
        isRefreshingToken = false;
        requestQueue.forEach((callback) => callback());
        requestQueue = [];
        return axiosInstance.request(originalRequest);
      } else {
        return new Promise((resolve) => {
          requestQueue.push(() => {
            resolve(axiosInstance.request(originalRequest));
          });
        });
      }
    }
    if (errorMessage) {
      $message.error(errorMessage);
    }
    return {
      status,
      message: errorMessage,
    };
  },
);

export type Response<T = any> = {
  status: number;
  message: string;
  data: {
    code: string;
    message: string;
    result: T;
  };
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  if (method === 'put') {
    return axiosInstance.put(url, data, config);
  }

  if (method === 'patch') {
    return axiosInstance.patch(url, data, config);
  }

  if (method === 'delete') {
    return axiosInstance.delete(url, {
      data,
      ...config,
    });
  }

  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};

const apiRefreshToken = async (token: string) => {
  const { data } = await axiosInstance.post('/v1/auth/refresh', { refreshToken: token });
  return {
    accessToken: data.result.accessToken,
    refreshToken: data.result.refreshToken,
  };
};
