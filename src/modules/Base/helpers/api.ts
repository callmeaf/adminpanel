import AuthTokenExpiredError from "@/modules/Auth/errors/AuthTokenExpiredError";
import { clearAuthCookies } from "@/modules/Auth/requests/coockie-requests";
import axios, { AxiosInstance } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.status === 401) {
      await clearAuthCookies();

      throw new AuthTokenExpiredError();
    }

    if (err.status === 304) {
      return err;
    }

    return Promise.reject(err);
  }
);

export type TApi = () => AxiosInstance;

const api: TApi = () => {
  return axiosInstance;
};

export default api;
