import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Permission
 * =============================
 */

export interface IPermissionResponse extends IDataResponse {
  name: string;
  guard_name: string;
}

export interface IPermissionStoreResponse extends IPermissionResponse {}

export interface IPermissionGetByKeyResponse extends IPermissionResponse {}

export interface IPermissionStatusUpdateResponse extends IPermissionResponse {}

export interface IPermissionTypeUpdateResponse extends IPermissionResponse {}

export interface IPermissionsResponse extends IPermissionResponse {}

export interface IPermissionsTrashedResponse extends IPermissionResponse {}

export interface IPermissionDeleteResponse extends IPermissionResponse {}

export interface IPermissionRestoreResponse extends IPermissionResponse {}

export interface IPermissionForceDeleteResponse extends IPermissionResponse {}

export interface IPermissionsExportResponse extends IExporterResponse {}

export interface IPermissionsImportResponse extends IImporterResponse {}
