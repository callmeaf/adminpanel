import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { IRoleResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface IRoleModel extends IModel {
  name: string;
  nameFa: string;
  guardName: string;
  permissionsArray: (coins: IOption[]) => undefined | IOption[];
}

const toRole = <T extends IRoleResponse>(data: T): IRoleModel => ({
  id: data.id,
  name: data.name,
  nameFa: data.name_fa,
  guardName: data.guard_name,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  permissionsArray: (permissions) =>
    permissions.filter((permission) =>
      data.permissions
        ?.map((permission) => permission.id)
        .includes(permission.value)
    ),
});

export default toRole;
