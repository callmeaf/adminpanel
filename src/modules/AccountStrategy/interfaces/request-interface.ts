import { IAccountResponse } from "@/modules/Account/interfaces/request-interface";
import { IAccountStrategyCoinResponse } from "@/modules/AccountStrategyCoin/interfaces/request-interface";
import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IStrategyResponse } from "@/modules/Strategy/interfaces/request-interface";

/**
 * =============================
 * AccountStrategy
 * =============================
 */

export interface IAccountStrategyResponse extends IDataResponse {
  account_id: string;
  strategy_slug: string;
  account: IAccountResponse;
  strategy?: IStrategyResponse;
  strategy_coins?: IAccountStrategyCoinResponse[];
}

export interface IAccountStrategyStoreResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyGetByKeyResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyStatusUpdateResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyTypeUpdateResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategiesResponse extends IAccountStrategyResponse {}

export interface IAccountStrategiesTrashedResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyDeleteResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyRestoreResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategyForceDeleteResponse
  extends IAccountStrategyResponse {}

export interface IAccountStrategiesExportResponse extends IExporterResponse {}

export interface IAccountStrategiesImportResponse extends IImporterResponse {}
