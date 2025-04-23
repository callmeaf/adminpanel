import { IResponse as IHttpResponse } from "@/modules/Base/hooks/use-http";
import { AxiosInstance, AxiosResponse } from "axios";

export type TThunk<
  IData,
  IExtra,
  IResponseSchema,
  WithPaginate extends boolean = false
> = (
  api: AxiosInstance,
  data: IData,
  extra: IExtra
) => Promise<AxiosResponse<IHttpResponse<IResponseSchema>, WithPaginate>>;

/**
 * =============================
 * Response
 * =============================
 */
export interface IDataResponse {
  id: string;
  status: string;
  status_text: string;
  type: string;
  type_text: string;
  created_at: string;
  created_at_text: string;
  updated_at: string;
  updated_at_text: string;
  deleted_at: string | null;
  deleted_at_text: string | null;
}

export interface IExporterResponse {
  errors: string[];
  success: string[];
}

export interface IImporterResponse {
  total: number;
  success: number;
}

/**
 * =============================
 * Enum
 * =============================
 */

type TEnumItem<T = string> = Record<string, T>;
interface IUserEnum {
  statuses: TEnumItem;
  types: TEnumItem;
}

export interface IEnumResponse {
  user: IUserEnum;
}

export interface IRevalidateResponse {
  revalidate: string;
}
