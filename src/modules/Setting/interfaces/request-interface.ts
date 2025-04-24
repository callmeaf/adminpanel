import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { SettingKey, ISettingValues } from "../models/Setting";

/**
 * =============================
 * Setting
 * =============================
 */

export interface ISettingResponse extends IDataResponse {
  key: SettingKey;
  values: ISettingValues;
}

export interface ISettingStoreResponse extends ISettingResponse {}

export interface ISettingGetByKeyResponse extends ISettingResponse {}

export interface ISettingStatusUpdateResponse extends ISettingResponse {}

export interface ISettingTypeUpdateResponse extends ISettingResponse {}

export interface ISettingsResponse extends ISettingResponse {}

export interface ISettingsTrashedResponse extends ISettingResponse {}

export interface ISettingDeleteResponse extends ISettingResponse {}

export interface ISettingRestoreResponse extends ISettingResponse {}

export interface ISettingForceDeleteResponse extends ISettingResponse {}

export interface ISettingsExportResponse extends IExporterResponse {}

export interface ISettingsImportResponse extends IImporterResponse {}
