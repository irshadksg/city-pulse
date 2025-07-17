import axios, { AxiosRequestConfig } from 'axios';

// Base URL for Ticketmaster API
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

// Create an Axios instance
const getInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      apikey: process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY,
    },
  });

  // (Optional) Response interceptor for global error logging
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const errorMessage = error?.response?.data?.message || error?.message;

      console.log(`HTTP Error: ${status}`, error?.response?.data);

      return Promise.reject(errorMessage || 'Something went wrong');
    },
  );

  return instance;
};

// Simplified HTTP methods
const get = (url: string, params: any = {}, config: AxiosRequestConfig = {}) =>
  getInstance().get(url, { params, ...config });

const post = (url: string, data: any = {}, params: any = {}, config: AxiosRequestConfig = {}) =>
  getInstance().post(url, data, { params, ...config });

const put = (url: string, data: any = {}, params: any = {}, config: AxiosRequestConfig = {}) =>
  getInstance().put(url, data, { params, ...config });

const patch = (url: string, data: any = {}, params: any = {}, config: AxiosRequestConfig = {}) =>
  getInstance().patch(url, data, { params, ...config });

const remove = (url: string, params: any = {}, data?: any, config: AxiosRequestConfig = {}) =>
  getInstance().delete(url, { params, data, ...config });

export const HttpService = {
  get,
  post,
  put,
  patch,
  delete: remove,
};
