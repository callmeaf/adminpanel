import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IMediaResponse } from "@/modules/Media/interfaces/request-interface";

/**
 * =============================
 * TicketReply
 * =============================
 */

export interface ITicketReplyResponse extends IDataResponse {
  sender_identifier: string;
  content?: string;
  attachments?: IMediaResponse[];
}

export interface ITicketReplyStoreResponse extends ITicketReplyResponse {}

export interface ITicketReplyGetByKeyResponse extends ITicketReplyResponse {}

export interface ITicketReplyStatusUpdateResponse
  extends ITicketReplyResponse {}

export interface ITicketReplyTypeUpdateResponse extends ITicketReplyResponse {}

export interface ITicketRepliesResponse extends ITicketReplyResponse {}

export interface ITicketRepliesTrashedResponse extends ITicketReplyResponse {}

export interface ITicketReplyDeleteResponse extends ITicketReplyResponse {}

export interface ITicketReplyRestoreResponse extends ITicketReplyResponse {}

export interface ITicketReplyForceDeleteResponse extends ITicketReplyResponse {}

export interface ITicketRepliesExportResponse extends IExporterResponse {}

export interface ITicketRepliesImportResponse extends IImporterResponse {}
