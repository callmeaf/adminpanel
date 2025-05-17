import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { ITicketResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import toMedia, { IMediaModel } from "@/modules/Media/models/Media";
import toTicketReply, {
  ITicketReplyModel,
} from "@/modules/TicketReply/models/TicketReply";

export interface ITicketModel extends IModel {
  refCode: string;
  senderIdentifier: string;
  receiverIdentifier: string;
  subject: string;
  subjectText: string;
  subjectObject: (subjects: IOption[]) => undefined | IOption;
  title: string;
  content: string;
  attachments?: IMediaModel[];
  replies?: ITicketReplyModel[];
}

const toTicket = <T extends ITicketResponse>(data: T): ITicketModel => ({
  id: data.ref_code,
  refCode: data.ref_code,
  senderIdentifier: data.sender_identifier,
  receiverIdentifier: data.receiver_identifier,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  subject: data.subject,
  subjectText: data.subject_text,
  subjectObject: (subjects) =>
    subjects.find((subject) => subject.value == data.subject),
  title: data.title,
  content: data.content,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  attachments: data.attachments?.map((attachment) => toMedia(attachment)) ?? [],
  replies: data.replies?.map((reply) => toTicketReply(reply)) ?? [],
});

export default toTicket;
