import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IAuthUserResponse,
  ILoginWithVerifyOtpResponse,
  ILogoutResponse,
} from "../interfaces/requset-interface";
import { clearAuthCookies } from "./coockie-requests";

export const csrfCookie: TThunk<{}, {}, {}> = async (api, data, extra) => {
  return api.get("/sanctum/csrf-cookie", {
    baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL,
  });
};

export const loginWithVerifyOtp: TThunk<
  {
    identifier: string;
    code: string;
  },
  {},
  ILoginWithVerifyOtpResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("identifier", data.identifier);
  formData.append("code", data.code);

  await csrfCookie(api, data, extra);

  return api.post("/login", formData);
};

export const getUser: TThunk<{}, {}, IAuthUserResponse> = (
  api,
  data,
  extra
) => {
  return api.get("/user");
};

export const logout: TThunk<{}, {}, ILogoutResponse> = async (
  api,
  data,
  extra
) => {
  const res = await api.post("/logout");
  await clearAuthCookies();

  return res;
};
