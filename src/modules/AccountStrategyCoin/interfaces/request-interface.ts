import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * AccountStrategyCoin
 * =============================
 */

export interface IAccountStrategyCoinResponse extends IDataResponse {
  example: string;
}

export interface IAccountStrategyCoinStoreResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinGetByKeyResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinStatusUpdateResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinTypeUpdateResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinsResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinsTrashedResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinDeleteResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinRestoreResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinForceDeleteResponse extends IAccountStrategyCoinResponse {}

export interface IAccountStrategyCoinsExportResponse extends IExporterResponse {}

export interface IAccountStrategyCoinsImportResponse extends IImporterResponse {}
