import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { ISocialBotResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface ISocialBotModel extends IModel {
  social_id: string;
  name: string;
  token: string;
  footer: string;
  footer_text: string;
  socialIdObject?: (statuses: IOption[]) => undefined | IOption;
}

const toSocialBot = <T extends ISocialBotResponse>(
  data: T
): ISocialBotModel => ({
  id: data.id,
  social_id: data.social_id,
  name: data.name,
  token: data.token,
  footer: data.footer,
  footer_text: data.footer_text,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  socialIdObject: (socials) =>
    socials.find((social) => social.value == data.social_id),
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toSocialBot;
