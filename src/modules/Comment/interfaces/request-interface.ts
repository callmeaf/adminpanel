import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";
import { IUserResponse } from "@/modules/User/interfaces/request-interface";

/**
 * =============================
 * Comment
 * =============================
 */

export interface ICommentResponse extends IDataResponse {
  parent_id?: number;
  commentable_id: string;
  commentable_type: string;
  author_identifier: string;
  is_pinned: boolean;
  content: string;
  author?: IUserResponse;
  replies?: ICommentResponse[];
  replies_count?: number;
}

export interface ICommentStoreResponse extends ICommentResponse {}

export interface ICommentGetByKeyResponse extends ICommentResponse {}

export interface ICommentStatusUpdateResponse extends ICommentResponse {}

export interface ICommentTypeUpdateResponse extends ICommentResponse {}

export interface ICommentsResponse extends ICommentResponse {}

export interface ICommentsTrashedResponse extends ICommentResponse {}

export interface ICommentDeleteResponse extends ICommentResponse {}

export interface ICommentRestoreResponse extends ICommentResponse {}

export interface ICommentForceDeleteResponse extends ICommentResponse {}

export interface ICommentsExportResponse extends IExporterResponse {}

export interface ICommentsImportResponse extends IImporterResponse {}
