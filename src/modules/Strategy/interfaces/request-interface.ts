import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IStrategyDefaultOptions } from "../models/Strategy";
import { ICoinResponse } from "@/modules/Coin/interfaces/request-interface";

/**
 * =============================
 * Strategy
 * =============================
 */

export interface IStrategyResponse extends IDataResponse {
  slug: string;
  name: string;
  user_email: string;
  total_amount: string;
  per_position_amount: string;
  position_direction: string;
  position_direction_text: string;
  position_type: string;
  position_type_text: string;
  risk_and_reward: string;
  leverage: string;
  save_profit_percent: string;
  content: string;
  default_options: IStrategyDefaultOptions;
  python_code: string;
  coins: ICoinResponse[];
}

export interface IStrategyStoreResponse extends IStrategyResponse {}

export interface IStrategyGetByKeyResponse extends IStrategyResponse {}

export interface IStrategyStatusUpdateResponse extends IStrategyResponse {}

export interface IStrategyTypeUpdateResponse extends IStrategyResponse {}

export interface IStrategiesResponse extends IStrategyResponse {}

export interface IStrategiesTrashedResponse extends IStrategyResponse {}

export interface IStrategyDeleteResponse extends IStrategyResponse {}

export interface IStrategyRestoreResponse extends IStrategyResponse {}

export interface IStrategyForceDeleteResponse extends IStrategyResponse {}

export interface IStrategiesExportResponse extends IExporterResponse {}

export interface IStrategiesImportResponse extends IImporterResponse {}
