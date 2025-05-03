import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { IAccountStrategyResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import toAccountStrategyCoin, {
  IAccountStrategyCoinModel,
} from "@/modules/AccountStrategyCoin/models/AccountStrategyCoin";
import toStrategy, { IStrategyModel } from "@/modules/Strategy/models/Strategy";
import toAccount, { IAccountModel } from "@/modules/Account/models/Account";

export interface IAccountStrategyModel extends IModel {
  accountId: string;
  accountIdObject: (accounts: IOption[]) => undefined | IOption;
  account?: IAccountModel;
  strategySlug: string;
  strategySlugObject: (strategies: IOption[]) => undefined | IOption;
  strategy?: IStrategyModel;
  strategyCoins: IAccountStrategyCoinModel[];
}

const toAccountStrategy = <T extends IAccountStrategyResponse>(
  data: T
): IAccountStrategyModel => ({
  id: data.id,
  accountId: data.account_id,
  accountIdObject: (accounts) =>
    accounts.find((account) => account.value == data.account_id),
  account: data.account ? toAccount(data.account) : undefined,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  strategySlug: data.strategy_slug,
  strategySlugObject: (strategies) =>
    strategies.find((strategy) => strategy.value == data.strategy_slug),
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
  strategy: data.strategy ? toStrategy(data.strategy) : undefined,
  strategyCoins:
    data.strategy_coins?.map((item) => toAccountStrategyCoin(item)) ?? [],
});

export default toAccountStrategy;
