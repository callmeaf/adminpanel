import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * SocialBot
 * =============================
 */

export interface ISocialBotResponse extends IDataResponse {
  social_id: string;
  name: string;
  token: string;
  footer: string;
  footer_text: string;
}

export interface ISocialBotStoreResponse extends ISocialBotResponse {}

export interface ISocialBotGetByKeyResponse extends ISocialBotResponse {}

export interface ISocialBotStatusUpdateResponse extends ISocialBotResponse {}

export interface ISocialBotTypeUpdateResponse extends ISocialBotResponse {}

export interface ISocialBotsResponse extends ISocialBotResponse {}

export interface ISocialBotsTrashedResponse extends ISocialBotResponse {}

export interface ISocialBotDeleteResponse extends ISocialBotResponse {}

export interface ISocialBotRestoreResponse extends ISocialBotResponse {}

export interface ISocialBotForceDeleteResponse extends ISocialBotResponse {}

export interface ISocialBotsExportResponse extends IExporterResponse {}

export interface ISocialBotsImportResponse extends IImporterResponse {}
