import toUser, { IUserModel } from "@/modules/User/models/User";
import { IMediaResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import fileArtisan from "@/modules/Base/helpers/file-artisan";

export interface IMediaModel extends IModel {
  url: string;
  uuid: string;
  collectionName: string;
  fileName: string;
  mimeType: string;
  disk: string;
  size: number;
  creatorIdentifier: string;
  creator?: IUserModel;
  isImage: Boolean;
  isPdf: Boolean;
}

const toMedia = <T extends IMediaResponse>(data: T): IMediaModel => ({
  id: data.uuid,
  uuid: data.uuid,
  url: data.url,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  collectionName: data.collection_name,
  fileName: data.file_name,
  mimeType: data.mime_type,
  disk: data.disk,
  size: data.size,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  creatorIdentifier: data.creator_identifier,
  creator: data.creator ? toUser(data.creator) : undefined,
  isImage: fileArtisan.isImage(data.mime_type),
  isPdf: fileArtisan.isPdf(data.mime_type),
});

export default toMedia;
