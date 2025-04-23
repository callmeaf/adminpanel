import { TThunk } from "@/modules/Base/interfaces/request-interface";
import { IOtpStoreResponse } from "../interfaces/request-interface";

export const sendOtp: TThunk<
  {
    identifier: string;
  },
  {},
  IOtpStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("identifier", data.identifier);

  return api.post("otps", formData);
};
