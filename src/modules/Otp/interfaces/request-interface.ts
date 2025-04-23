import { IDataResponse } from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * OTP
 * =============================
 */
export interface IOtpResponse extends IDataResponse {
  code: string;
  identifier: string;
  expired_at: string;
}
export interface IOtpStoreResponse extends IOtpResponse {}
