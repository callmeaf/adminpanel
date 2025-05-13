import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { ICoinResponse } from "@/modules/Coin/interfaces/request-interface";

/**
 * =============================
 * Exchange
 * =============================
 */

export interface IExchangeResponse extends IDataResponse {
  slug: string;
  name: string;
  site_url: string;
  api_url: string;
  maker_fee_percent: string;
  taker_fee_percent: string;
  content: string;
  coins?: ICoinResponse[];
}

export interface IExchangeStoreResponse extends IExchangeResponse {}

export interface IExchangeGetByKeyResponse extends IExchangeResponse {}

export interface IExchangePasswordUpdateResponse extends IExchangeResponse {}

export interface IExchangeStatusUpdateResponse extends IExchangeResponse {}

export interface IExchangeTypeUpdateResponse extends IExchangeResponse {}

export interface IExchangesResponse extends IExchangeResponse {}

export interface IExchangesTrashedResponse extends IExchangeResponse {}

export interface IExchangeDeleteResponse extends IExchangeResponse {}

export interface IExchangeRestoreResponse extends IExchangeResponse {}

export interface IExchangeForceDeleteResponse extends IExchangeResponse {}

export interface IExchangesExportResponse extends IExporterResponse {}

export interface IExchangesImportResponse extends IImporterResponse {}

export interface IExchangeSyncCoinsResponse extends IExchangeResponse {}
