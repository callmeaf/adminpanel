import toUser, { IUserModel } from "@/modules/User/models/User";
import { ICommentResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import { IPaginateModel } from "@/modules/Base/models/Paginate";

export enum CommentableType {
  STRATEGY = "strategy",
}

export interface ICommentModel extends IModel {
  parentId?: number;
  commentableId: string;
  commentableType: CommentableType;
  authorIdentifier: string;
  isPinned: boolean;
  content: string;
  author?: IUserModel;
  replies?: ICommentModel[];
  repliesCount?: number;
  repliesPaginate?: IPaginateModel;
}

const toComment = <T extends ICommentResponse>(
  data: T,
  repliesPaginate?: IPaginateModel
): ICommentModel => ({
  id: data.id,
  parentId: data.parent_id,
  commentableId: data.commentable_id,
  commentableType: data.commentable_type as CommentableType,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  authorIdentifier: data.author_identifier,
  isPinned: data.is_pinned,
  content: data.content,
  author: data.author ? toUser(data.author) : undefined,
  replies: data.replies
    ? data.replies.map((reply) => toComment(reply))
    : undefined,
  repliesCount: data.replies_count,
  repliesPaginate: repliesPaginate ?? undefined,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toComment;
