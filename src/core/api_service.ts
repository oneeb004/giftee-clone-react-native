import { ResponseObject } from "../utils/response";
import { httpClient } from "./http_client";

export const ApiService = {
  get: async <T>(url: string, params?: any) => {
    const res = await httpClient.get<ResponseObject<T>>(url, { params });
    return res.data;
  },

  post: async <T>(url: string, body?: any) => {
    const res = await httpClient.post<ResponseObject<T>>(url, body);
    return res.data;
  },

  put: async <T>(url: string, body?: any) => {
    const res = await httpClient.put<ResponseObject<T>>(url, body);
    return res.data;
  },

  delete: async <T>(url: string) => {
    const res = await httpClient.delete<ResponseObject<T>>(url);
    return res.data;
  },
};
