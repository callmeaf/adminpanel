import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Version
 * =============================
 */

export interface IVersionResponse extends IDataResponse {
  content: string;
}

export interface IVersionStoreResponse extends IVersionResponse {}

export interface IVersionGetByKeyResponse extends IVersionResponse {}

export interface IVersionStatusUpdateResponse extends IVersionResponse {}

export interface IVersionTypeUpdateResponse extends IVersionResponse {}

export interface IVersionsResponse extends IVersionResponse {}

export interface IVersionsTrashedResponse extends IVersionResponse {}

export interface IVersionDeleteResponse extends IVersionResponse {}

export interface IVersionRestoreResponse extends IVersionResponse {}

export interface IVersionForceDeleteResponse extends IVersionResponse {}

export interface IVersionsExportResponse extends IExporterResponse {}

export interface IVersionsImportResponse extends IImporterResponse {}
