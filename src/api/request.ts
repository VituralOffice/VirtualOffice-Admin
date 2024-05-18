import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import Cookies from 'js-cookie';
import { message as $message } from 'antd';

import useAuthStore from '@/stores/auth.store';

import { COOKIE_KEYS } from '@/constants/common';
import { API_URL } from './constant';

const axiosInstance = axios.create({
  timeout: 300000,
  baseURL: `${API_URL}/v1`,
});

let isRefreshingToken: boolean = false;
let requestQueue: ((token: string) => void)[] = [];

axiosInstance.interceptors.request.use(
  (config) => {
    const headers = {
      Authorization: `Bearer ${Cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || ''}`,
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

    if (
      status === 401 &&
      error?.response?.data?.message === 'Token expired' &&
      !originalRequest._retry
    ) {
      if (!isRefreshingToken) {
        originalRequest._retry = true;
        isRefreshingToken = true;

        const data = await useAuthStore.getState().refreshToken();

        if (data?.access && data?.refresh) {
          const accessToken = data.access.token;
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
          isRefreshingToken = false;
          requestQueue.forEach((callback) => callback(accessToken));
          requestQueue = [];
          return axiosInstance.request(originalRequest);
        }

        isRefreshingToken = false;
      } else {
        return new Promise((resolve) => {
          requestQueue.push((newAccessToken) => {
            originalRequest.headers['Authorization'] =
              'Bearer ' + newAccessToken;

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
    status: number;
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
