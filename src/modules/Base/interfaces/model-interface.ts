import { IOption } from "../components/forms/AutoComplete";

export enum ModelStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export interface IModel {
  id: string;
  status?: string;
  statusText?: string;
  statusObject?: (statuses: IOption[]) => undefined | IOption;
  type?: string;
  typeText?: string;
  typeObject?: (types: IOption[]) => undefined | IOption;
  createdAt: string;
  createdAtText: string;
  updatedAt: string;
  updatedAtText: string;
  deletedAt: string | null;
  deletedAtText: string | null;
}
