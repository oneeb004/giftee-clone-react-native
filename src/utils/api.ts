
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";



 const VERSION = "v1";
 const BASE_URL = "https://giftee-api-dev.hostinger.bitscollision.net" ;

export const END_POINTS = {
  VERIFY_USERNAME: `/${VERSION}/Home/VerifyUserName`,
  GET_CITY_LISTING: `/${VERSION}/Home/GetCityListing`,
  REGISTER_AND_SEND_OTP: `/${VERSION}/Home/RegisterUserAndSendOTP`,
  SIGN_IN: `/${VERSION}/Home/SignIn`, 
  VERIFY_OTP: `/${VERSION}/Home/VerifyOTP`,
  VERIFY_OTP_SIGNIN: `/${VERSION}/Home/VerifyOTP-SignIn`,
};



 const HEADER_KEYS = {
  LangID: "LangID",
  UserId: "UserId",
  ContentType: "Content-Type",
};

 const DEFAULT_HEADERS = {
  [HEADER_KEYS.ContentType]: "application/json",
} ;



export interface ResponseObject<T> {
  success: boolean;
  failed: boolean;
  data: T | null;
  error: string;
}



let langId = 1;
let userId: number | null = null;

export const Session = {
  setLangId: (id: number) => {
    langId = id;
  },
  getLangId: () => langId,

  setUserId: (id: number | null) => {
    userId = id;
  },
  getUserId: () => userId,
};



 const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 20000,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers[HEADER_KEYS.LangID] = Session.getLangId();
    const uid = Session.getUserId();
    if (uid !== null && uid !== undefined) {
      config.headers[HEADER_KEYS.UserId] = uid;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



export const ApiService = {
  get: async <T>(url: string, params?: any): Promise<ResponseObject<T>> => {
    const res = await httpClient.get<ResponseObject<T>>(url, { params });
    return res.data;
  },

  post: async <T>(url: string, body?: any): Promise<ResponseObject<T>> => {
    const res = await httpClient.post<ResponseObject<T>>(url, body);
    return res.data;
  },

  put: async <T>(url: string, body?: any): Promise<ResponseObject<T>> => {
    const res = await httpClient.put<ResponseObject<T>>(url, body);
    return res.data;
  },

  delete: async <T>(url: string): Promise<ResponseObject<T>> => {
    const res = await httpClient.delete<ResponseObject<T>>(url);
    return res.data;
  },
};



export const getApiErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as Partial<ResponseObject<any>> | undefined;
    return (
      data?.error ||
      err.message ||
      "Request failed. Please try again."
    );
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong.";
};
