const VERSION = 'v1';

export const apiEndpoints = {
  BASE_URL: 'https://giftee-api-dev.hostinger.bitscollision.net',
  VERIFY_USERNAME: `/${VERSION}/Home/VerifyUserName`,
  GET_CITY_LISTING: `/${VERSION}/Home/GetCityListing`,
  REGISTER_AND_SEND_OTP: `/${VERSION}/Home/RegisterUserAndSendOTP`,
  SIGN_IN: `/${VERSION}/Home/SignIn`,
  VERIFY_OTP: `/${VERSION}/Home/VerifyOTP`,
  VERIFY_OTP_SIGNIN: `/${VERSION}/Home/VerifyOTP-SignIn`,
};
