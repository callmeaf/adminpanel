import { clearRevalidateCookie } from "@/modules/Auth/requests/coockie-requests";
import {
  IEnumResponse,
  IRevalidateResponse,
  TThunk,
} from "../interfaces/request-interface";
import { localStorageArtisan } from "../helpers/local-storage-artisan";

export const getEnums: TThunk<
  {
    package?: string;
  },
  {},
  IEnumResponse
> = async (api, data, extra) => {
  const res = await api.get(
    "enums",
    data
      ? {
          params: {
            package: data.package,
          },
        }
      : {}
  );

  if (res.status === 200) {
    localStorageArtisan.set("enums", res.data, true);
  }

  return res;
};

export const getRevalidate: TThunk<{}, {}, IRevalidateResponse> = async (
  api,
  data,
  extra
) => {
  const res = await api.get("revalidate");

  await clearRevalidateCookie(res.data.revalidate);

  return res;
};
