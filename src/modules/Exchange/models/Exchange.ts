import toCoin, { ICoinModel } from "@/modules/Coin/models/Coin";
import { IExchangeResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import { IOption } from "@/modules/Base/components/forms/AutoComplete";

export interface IExchangeModel extends IModel {
  slug: string;
  name: string;
  siteUrl: string;
  apiUrl: string;
  makerFeePercent: string;
  takerFeePercent: string;
  content: string;
  coins: ICoinModel[];
  coinsArray: (coins: IOption[]) => undefined | IOption[];
}

const toExchange = <T extends IExchangeResponse>(data: T): IExchangeModel => ({
  id: data.slug,
  slug: data.slug,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  name: data.name,
  siteUrl: data.site_url,
  apiUrl: data.api_url,
  makerFeePercent: data.maker_fee_percent,
  takerFeePercent: data.taker_fee_percent,
  content: data.content,
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  coins: data.coins?.map((coin) => toCoin(coin)) ?? [],
  coinsArray: (coins) =>
    coins.filter((coin) =>
      data.coins?.map((coin) => coin.symbol).includes(coin.value)
    ),
});

export default toExchange;
