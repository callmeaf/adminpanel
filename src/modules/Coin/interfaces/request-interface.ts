import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Coin
 * =============================
 */

export interface ICoinResponse extends IDataResponse {
  symbol: string;
}

export interface ICoinStoreResponse extends ICoinResponse {}

export interface ICoinGetByKeyResponse extends ICoinResponse {}

export interface ICoinStatusUpdateResponse extends ICoinResponse {}

export interface ICoinTypeUpdateResponse extends ICoinResponse {}

export interface ICoinsResponse extends ICoinResponse {}

export interface ICoinsTrashedResponse extends ICoinResponse {}

export interface ICoinDeleteResponse extends ICoinResponse {}

export interface ICoinRestoreResponse extends ICoinResponse {}

export interface ICoinForceDeleteResponse extends ICoinResponse {}

export interface ICoinsExportResponse extends IExporterResponse {}

export interface ICoinsImportResponse extends IImporterResponse {}
