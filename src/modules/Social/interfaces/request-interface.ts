import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Social
 * =============================
 */

export interface ISocialResponse extends IDataResponse {
  chat_id: string;
}

export interface ISocialStoreResponse extends ISocialResponse {}

export interface ISocialGetByKeyResponse extends ISocialResponse {}

export interface ISocialStatusUpdateResponse extends ISocialResponse {}

export interface ISocialTypeUpdateResponse extends ISocialResponse {}

export interface ISocialsResponse extends ISocialResponse {}

export interface ISocialsTrashedResponse extends ISocialResponse {}

export interface ISocialDeleteResponse extends ISocialResponse {}

export interface ISocialRestoreResponse extends ISocialResponse {}

export interface ISocialForceDeleteResponse extends ISocialResponse {}

export interface ISocialsExportResponse extends IExporterResponse {}

export interface ISocialsImportResponse extends IImporterResponse {}
