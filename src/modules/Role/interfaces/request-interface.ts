import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IPermissionResponse } from "@/modules/Permission/interfaces/request-interface";

/**
 * =============================
 * Role
 * =============================
 */

export interface IRoleResponse extends IDataResponse {
  name: string;
  name_fa: string;
  guard_name: string;
  permissions?: IPermissionResponse[];
}

export interface IRoleStoreResponse extends IRoleResponse {}

export interface IRoleGetByKeyResponse extends IRoleResponse {}

export interface IRoleStatusUpdateResponse extends IRoleResponse {}

export interface IRoleTypeUpdateResponse extends IRoleResponse {}

export interface IRolesResponse extends IRoleResponse {}

export interface IRolesTrashedResponse extends IRoleResponse {}

export interface IRoleDeleteResponse extends IRoleResponse {}

export interface IRoleRestoreResponse extends IRoleResponse {}

export interface IRoleForceDeleteResponse extends IRoleResponse {}

export interface IRolesExportResponse extends IExporterResponse {}

export interface IRolesImportResponse extends IImporterResponse {}
export interface IRoleSyncPermissionsResponse extends IRoleResponse {}
