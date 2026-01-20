export interface City {
  CityID: number;
  CityNameEn: string | null;
  CityNameAr: string | null;
  CityName: string;
  Status: number;
}

export type GetCityListingResponse = {
  Data: {
    cities: City[];
  };
};




export interface User {
  UserId: number;
  FullNameEn: string | null;
  FullNameAr: string | null;
  UserName: string;
  Email: string;
  Password: string | null;
  DateOfBirth: string | null;
  GenderId: number | null;
  ProfileUrl: string | null;
  Status: number;
  PhoneNo: string;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedOn: string | null;
  ModifiedBy: number | null;
  CityId: number;
  City: string | null;
}

export type VerifyOtpResponse = {
  Data: {
    Message: string;
    User: User;
  };
};