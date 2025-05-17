import toMedia, { IMediaModel } from "@/modules/Media/models/Media";
import { ITicketReplyResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface ITicketReplyModel extends IModel {
  senderIdentifier: string;
  content?: string;
  attachments: IMediaModel[];
}

const toTicketReply = <T extends ITicketReplyResponse>(
  data: T
): ITicketReplyModel => ({
  id: data.id,
  senderIdentifier: data.sender_identifier,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  content: data.content,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  attachments: data.attachments?.map((attachment) => toMedia(attachment)) ?? [],
});

export default toTicketReply;
