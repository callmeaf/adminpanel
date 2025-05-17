import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IMediaResponse } from "@/modules/Media/interfaces/request-interface";
import { ITicketReplyResponse } from "@/modules/TicketReply/interfaces/request-interface";

/**
 * =============================
 * Ticket
 * =============================
 */

export interface ITicketResponse extends IDataResponse {
  ref_code: string;
  sender_identifier: string;
  receiver_identifier: string;
  subject: string;
  subject_text: string;
  title: string;
  content: string;
  attachments?: IMediaResponse[];
  replies?: ITicketReplyResponse[];
}

export interface ITicketStoreResponse extends ITicketResponse {}

export interface ITicketGetByKeyResponse extends ITicketResponse {}

export interface ITicketStatusUpdateResponse extends ITicketResponse {}

export interface ITicketTypeUpdateResponse extends ITicketResponse {}

export interface ITicketsResponse extends ITicketResponse {}

export interface ITicketsTrashedResponse extends ITicketResponse {}

export interface ITicketDeleteResponse extends ITicketResponse {}

export interface ITicketRestoreResponse extends ITicketResponse {}

export interface ITicketForceDeleteResponse extends ITicketResponse {}

export interface ITicketsExportResponse extends IExporterResponse {}

export interface ITicketsImportResponse extends IImporterResponse {}
