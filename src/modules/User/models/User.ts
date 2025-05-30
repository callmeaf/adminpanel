import valueArtisan from "@/modules/Base/helpers/value-artisan";
import { IUserResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import toMedia, { IMediaModel } from "@/modules/Media/models/Media";
import { IOption } from "@/modules/Base/components/forms/AutoComplete";

export interface IUserModel extends IModel {
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string;
  email: string;
  image?: IMediaModel;
  rolesArray: (coins: IOption[]) => undefined | IOption[];
}

const toUser = <T extends IUserResponse>(data: T): IUserModel => ({
  id: data.id,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  firstName: data.first_name,
  lastName: data.last_name,
  fullName: valueArtisan.merge(" ", " - ", data.first_name, data.last_name),
  mobile: data.mobile,
  email: data.email,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  image: data.image ? toMedia(data.image) : undefined,
  rolesArray: (roles) =>
    roles.filter((role) =>
      data.roles?.map((role) => role.id).includes(role.value)
    ),
});

export default toUser;
