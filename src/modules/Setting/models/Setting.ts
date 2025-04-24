import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { ISettingResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export enum SettingKey {
  SITE = "site",
  CONTACT = "contact",
}

export interface ISettingValues {
  [key: string]: string;
}

export const settingValuesByKey: {
  [key: string]: {
    name: string;
    label: string;
  }[];
} = {
  [SettingKey.SITE]: [
    {
      name: "version",
      label: "Version",
    },
  ],
  [SettingKey.CONTACT]: [
    {
      name: "email",
      label: "Email",
    },
    {
      name: "telegram",
      label: "Telegram",
    },
  ],
};

export interface ISettingModel extends IModel {
  key: SettingKey;
  keyObject?: (statuses: IOption[]) => undefined | IOption;
  values: ISettingValues;
}

const toSetting = <T extends ISettingResponse>(data: T): ISettingModel => ({
  id: data.key,
  key: data.key,
  keyObject: (keys) => keys.find((key) => key.value == data.key),
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  values: data.values,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toSetting;
