import axios, { AxiosRequestConfig } from 'axios';
import { apiEndpoints } from './endpoints';

const axiosInter = axios.create({
  baseURL: apiEndpoints.BASE_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

interface ResponseObject<T> {
  success: boolean;
  failed: boolean;
  data: T | null;
  error: string;
  ResponseCode: number;
}

const caller = async <T>(
  area: 'public' | 'private',
  type: 'post' | 'get' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>,
) => {
  const responseObject: ResponseObject<T> = {
    success: false,
    failed: false,
    data: null,
    error: '',
    ResponseCode: 0,
  };

  config = {
    ...config,
    headers: {
      ...config?.headers,
    },
  };

  try {
    let response;
    if (type === 'get' || type === 'delete') {
      response = await axiosInter[type](url, config);
    } else {
      response = await axiosInter[type](url, data, config);
    }

    responseObject.success = true;
    responseObject.failed = false;
    responseObject.data = response.data;
    responseObject.error = '';
    responseObject.ResponseCode = response.status;
  } catch (err: any) {
    const response = err?.response?.data;
    let errorMessage =
      response?.error?.message ||
      response?.message ||
      response?.ResponseMessage ||
      err?.message ||
      'Something went wrong';

    responseObject.ResponseCode = err?.response?.status || 0;

    if (
      err?.response?.status === 500 ||
      err?.response?.status === 503 ||
      err?.response?.status === 0
    ) {
      errorMessage = 'Network Error, Please try again later.';
    }

    responseObject.error = errorMessage;
    responseObject.data = response?.data || null;
    responseObject.failed = true;
    responseObject.success = false;
  }

  if (true) {
    console.log('\n\n');
    console.log('Api Call --> ', `[${type?.toUpperCase()}]`, url);
    if (data) {
      console.log('\tdata ->', data);
    }
    if (config) {
      console.log('\tconfig ->', config);
    }
    console.log('\tresponse ->', responseObject);
    console.log('\n');
  }

  return responseObject as ResponseObject<T>;
};

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
    caller<T>('public', 'get', url, undefined, config),
  delete: async <T>(url: string, config?: AxiosRequestConfig<any>) =>
    caller<T>('public', 'delete', url, undefined, config),
  post: async <T>(url: string, data: any, config?: AxiosRequestConfig<any>) =>
    caller<T>('public', 'post', url, data, config),
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig<any>) =>
    caller<T>('public', 'put', url, data, config),
};

export default api;

export const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const getAuthHeaderWithFormData = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};
