import { ILogResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface ILogModel extends IModel {
  logName: string;
  description: string;
  subjectType: string;
  event: string;
  subjectId: string;
  causerType: string;
  causerId: string;
  changes: {
    old: {
      [key: string]: string;
    };
    attributes: {
      [key: string]: string;
    };
  };
}

const toLog = <T extends ILogResponse>(data: T): ILogModel => ({
  id: data.id,
  logName: data.log_name,
  description: data.description,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  subjectType: data.subject_type,
  subjectId: data.subject_id,
  event: data.event,
  causerType: data.causer_type,
  causerId: data.causer_id,
  changes: data.changes,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toLog;
