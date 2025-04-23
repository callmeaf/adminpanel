import { IDataResponse } from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Auth
 * =============================
 */
export interface IAuthResponse extends IDataResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  token?: string;
}
export interface ILoginWithVerifyOtpResponse extends IAuthResponse {}

export interface IAuthUserResponse extends IAuthResponse {}

export interface ILogoutResponse extends IAuthResponse {}
