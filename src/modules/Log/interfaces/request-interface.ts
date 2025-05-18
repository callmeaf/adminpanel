import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Log
 * =============================
 */

export interface ILogResponse extends IDataResponse {
  log_name: string;
  description: string;
  subject_type: string;
  event: string;
  subject_id: string;
  causer_type: string;
  causer_id: string;
  changes: {
    old: {
      [key: string]: string;
    };
    attributes: {
      [key: string]: string;
    };
  };
}

export interface ILogStoreResponse extends ILogResponse {}

export interface ILogGetByKeyResponse extends ILogResponse {}

export interface ILogStatusUpdateResponse extends ILogResponse {}

export interface ILogTypeUpdateResponse extends ILogResponse {}

export interface ILogsResponse extends ILogResponse {}

export interface ILogsTrashedResponse extends ILogResponse {}

export interface ILogDeleteResponse extends ILogResponse {}

export interface ILogRestoreResponse extends ILogResponse {}

export interface ILogForceDeleteResponse extends ILogResponse {}

export interface ILogsExportResponse extends IExporterResponse {}

export interface ILogsImportResponse extends IImporterResponse {}
