import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { IAccountResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";

export interface IAccountModel extends IModel {
  publicKey: string;
  secretKey: string;
  userEmail: string;
  exchangeSlug: string;
  totalAmount: string;
  options: {
    [key: string]: string;
  };
  exchangeSlugObject?: (types: IOption[]) => undefined | IOption;
}

const toAccount = <T extends IAccountResponse>(data: T): IAccountModel => ({
  id: data.id,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  publicKey: data.public_key,
  secretKey: data.secret_key,
  userEmail: data.user_email,
  exchangeSlug: data.exchange_slug,
  exchangeSlugObject: (exchanges) =>
    exchanges.find((exchange) => exchange.value == data.exchange_slug),
  totalAmount: data.total_amount,
  options: data.options,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toAccount;
