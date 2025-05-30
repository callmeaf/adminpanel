import { IPermissionResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface IPermissionModel extends IModel {
  name: string;
  guardName: string;
}

const toPermission = <T extends IPermissionResponse>(
  data: T
): IPermissionModel => ({
  id: data.id,
  name: data.name,
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
});

export default toPermission;
