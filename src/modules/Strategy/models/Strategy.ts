import { IOption } from "@/modules/Base/components/forms/AutoComplete";
import { IStrategyResponse } from "../interfaces/request-interface";
import { IModel } from "@/modules/Base/interfaces/model-interface";
import { ICoinResponse } from "@/modules/Coin/interfaces/request-interface";

export interface IStrategyDefaultOptions {
  open_position: boolean;
  check_active_position: boolean;
  set_leverage: boolean;
  set_position_type: boolean;
  sleep_second_between_each_request: boolean;
}

export interface IStrategyModel extends IModel {
  slug: string;
  name: string;
  userEmail: string;
  totalAmount: number | string;
  perPositionAmount: number | string;
  positionDirection: string;
  positionDirectionText: string;
  positionDirectionObject: (directions: IOption[]) => undefined | IOption;
  positionType: string;
  positionTypeText: string;
  positionTypeObject: (types: IOption[]) => undefined | IOption;
  riskAndReward: number | string;
  leverage: number | string;
  saveProfitPercent: number | string;
  content: string;
  defaultOptions: IStrategyDefaultOptions;
  pythonCode: string;
  coins?: ICoinResponse[];
  coinsArray: (coins: IOption[]) => undefined | IOption[];
}

const toStrategy = <T extends IStrategyResponse>(data: T): IStrategyModel => ({
  id: data.slug,
  slug: data.slug,
  name: data.name,
  status: data.status,
  statusText: data.status_text,
  statusObject: (statuses) =>
    statuses.find((status) => status.value == data.status),
  type: data.type,
  typeText: data.type_text,
  typeObject: (types) => types.find((type) => type.value == data.type),
  userEmail: data.user_email,
  totalAmount: data.total_amount,
  perPositionAmount: data.per_position_amount,
  positionDirection: data.position_direction,
  positionDirectionText: data.position_direction_text,
  positionDirectionObject: (directions) =>
    directions.find((direction) => direction.value == data.position_direction),
  positionType: data.position_type,
  positionTypeText: data.position_type_text,
  positionTypeObject: (types) =>
    types.find((type) => type.value == data.position_type),
  riskAndReward: data.risk_and_reward,
  leverage: data.leverage,
  saveProfitPercent: data.save_profit_percent,
  content: data.content,
  defaultOptions: data.default_options,
  pythonCode: data.python_code,
  coins: data.coins,
  coinsArray: (coins) =>
    coins.filter((coin) =>
      data.coins?.map((coin) => coin.symbol).includes(coin.value)
    ),
  createdAt: data.created_at,
  createdAtText: data.created_at_text,
  updatedAt: data.updated_at,
  updatedAtText: data.updated_at_text,
  deletedAt: data.deleted_at,
  deletedAtText: data.deleted_at_text,
});

export default toStrategy;
