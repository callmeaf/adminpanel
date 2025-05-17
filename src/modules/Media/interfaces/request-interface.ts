import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IUserResponse } from "@/modules/User/interfaces/request-interface";

/**
 * =============================
 * Media
 * =============================
 */

export interface IMediaResponse extends IDataResponse {
  url: string;
  uuid: string;
  collection_name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  size: number;
  creator_identifier: string;
  creator?: IUserResponse;
}

export interface IMediaStoreResponse extends IMediaResponse {}

export interface IMediaGetByKeyResponse extends IMediaResponse {}

export interface IMediaStatusUpdateResponse extends IMediaResponse {}

export interface IMediaTypeUpdateResponse extends IMediaResponse {}

export interface IMediaShowResponse extends IMediaResponse {}

export interface IMediaTrashedResponse extends IMediaResponse {}

export interface IMediaDeleteResponse extends IMediaResponse {}

export interface IMediaRestoreResponse extends IMediaResponse {}

export interface IMediaForceDeleteResponse extends IMediaResponse {}

export interface IMediaExportResponse extends IExporterResponse {}

export interface IMediaImportResponse extends IImporterResponse {}
