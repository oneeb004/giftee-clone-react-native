import { GetCityListingResponse, VerifyOtpResponse } from "../types/auth_type";
import { ApiService, END_POINTS } from "../utils/api";

const normalizeUsername = (username: string) => username.trim().toLowerCase();

const normalizeSaudiPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("966")) return digits.slice(3);
  return digits;
};

export const AuthApi = {
  verifyUsername: (username: string) => {
    const body = normalizeUsername(username);
    return ApiService.post<any>(END_POINTS.VERIFY_USERNAME, body);
  },

  getCityListing: () => {
    return ApiService.get<GetCityListingResponse>(END_POINTS.GET_CITY_LISTING);
  },

  registerUserAndSendOtp: (payload: {
    FullName: string;
    UserName: string;
    CityId: string; 
    Phone: string;
    Email: string;
  }) => {
    const body = {
      ...payload,
      FullName: payload.FullName.trim(),
      UserName: normalizeUsername(payload.UserName),
      CityId: payload.CityId, 
      Phone: normalizeSaudiPhone(payload.Phone),
      Email: payload.Email.trim(),
    };

    return ApiService.post<any>(END_POINTS.REGISTER_AND_SEND_OTP, body);
  },

  signIn: (payload: { Email?: string; PhoneNo?: string }) => {
    const body = payload.PhoneNo
      ? { PhoneNo: normalizeSaudiPhone(payload.PhoneNo) }
      : { Email: (payload.Email ?? "").trim() };

    return ApiService.post<any>(END_POINTS.SIGN_IN, body);
  },

  verifyOtpSignUp: (payload: { OTP: string; Email: string; PhoneNo: string }) => {
    const body = {
      OTP: payload.OTP.trim(),
      Email: payload.Email.trim(),
      PhoneNo: normalizeSaudiPhone(payload.PhoneNo),
    };

    return ApiService.post<VerifyOtpResponse>(END_POINTS.VERIFY_OTP, body);
  },

  verifyOtpSignIn: (payload: { OTP: string; Email: string; PhoneNo: string }) => {
    const body = {
      OTP: payload.OTP.trim(),
      Email: payload.Email.trim(),
      PhoneNo: normalizeSaudiPhone(payload.PhoneNo),
    };

    return ApiService.post<VerifyOtpResponse>(END_POINTS.VERIFY_OTP_SIGNIN, body);
  },
};
