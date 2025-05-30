import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IMediaResponse } from "@/modules/Media/interfaces/request-interface";
import { IRoleResponse } from "@/modules/Role/interfaces/request-interface";

/**
 * =============================
 * User
 * =============================
 */

export interface IUserResponse extends IDataResponse {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  image?: IMediaResponse;
  roles?: IRoleResponse[];
}

export interface IUserStoreResponse extends IUserResponse {}

export interface IUserGetByKeyResponse extends IUserResponse {}

export interface IUserPasswordUpdateResponse extends IUserResponse {}

export interface IUserStatusUpdateResponse extends IUserResponse {}

export interface IUserTypeUpdateResponse extends IUserResponse {}

export interface IUsersResponse extends IUserResponse {}

export interface IUsersTrashedResponse extends IUserResponse {}

export interface IUserDeleteResponse extends IUserResponse {}

export interface IUserRestoreResponse extends IUserResponse {}

export interface IUserForceDeleteResponse extends IUserResponse {}

export interface IUsersExportResponse extends IExporterResponse {}

export interface IUsersImportResponse extends IImporterResponse {}
export interface IUserSyncRolesResponse extends IUserResponse {}
