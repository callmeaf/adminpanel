import { IOtpResponse } from "@/modules/Otp/interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface IOtpModel extends IModel {
  code: string;
  identifier: string;
  expiredAt: string;
}

const toOtp = <T extends IOtpResponse>(data: T): IOtpModel => ({
  code: data.code,
  identifier: data.identifier,
  expiredAt: data.expired_at,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  deletedAt: data.deleted_at,
});

export default toOtp;
