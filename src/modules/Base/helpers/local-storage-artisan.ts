import toUser, { IUserModel } from "@/modules/User/models/User";
import { IOption } from "../components/forms/AutoComplete";
import { jsonArtisan } from "./json-artisan";

type TEnumsReturnType = Record<string, IOption[]>;

export enum EnumSource {
  // [ENUM ENTRIES]
  USER = "user",
  EXCHANGE = "exchange",
  COIN = "coin",
  SETTING = "setting",
  ACCOUNT = "account",
  STRATEGY = "strategy",
    ACCOUNT_STRATEGY = "account_strategy",
  ACCOUNT_STRATEGY_COIN = "account_strategy_coin",
// [END ENUM ENTRIES]
}

interface ILocalStorageArtisan {
  get: (key: string, parseJson?: boolean) => any;
  isEmpty: (key: string) => boolean;
  set: (key: string, value: any, toJson?: boolean, expireAt?: number) => void;
  remove: (key: string) => void;
  update: (
    key: string,
    value: Object,
    toJson?: boolean,
    expireAt?: number
  ) => void;
  enums: (source: EnumSource) => TEnumsReturnType;
  getAuthToken: () => string | undefined;
  setAuthToken: (value: string) => void;
  removeAuthToken: () => void;
  getAuthUser: () => IUserModel | undefined;
  setAuthUser: (user: any) => void;
  removeAuthUser: () => void;
}

export const localStorageArtisan: ILocalStorageArtisan = {
  get: (key, parseJson) => {
    if (typeof window == "undefined") {
      return;
    }
    let value = `${localStorage.getItem(key)}`;

    if (parseJson) {
      value = jsonArtisan.parse(value);
    }

    if (value == "null" || value == "undefined") {
      return;
    }
    return value;
  },
  isEmpty: function (key) {
    if (typeof window == "undefined") {
      return true;
    }
    let value = this.get(key);
    value = jsonArtisan.parse(value);

    switch (true) {
      case value instanceof Object: {
        return Object.keys(value).length === 0;
      }
      default: {
        return !!!value;
      }
    }
  },
  set: (key, value, toJson, expireAt) => {
    if (typeof window == "undefined") {
      return;
    }
    if (expireAt) {
      const now = new Date();
      now.setSeconds(now.getSeconds() + expireAt);
    }

    if (toJson) {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  update: function (key, value, toJson, expireAt) {
    if (typeof window == "undefined") {
      return;
    }
    if (!this.get(key, toJson)) {
      this.set(key, value, toJson, expireAt);
    }

    const updatedValue = {
      ...this.get(key, toJson),
      ...value,
    };

    this.set(key, updatedValue, toJson, expireAt);
  },
  enums(source) {
    if (typeof window == "undefined") {
      return {};
    }
    const enumsStore = this.get("enums", true) ?? {};
    const enumsSource = enumsStore[source] ?? {};

    const options: TEnumsReturnType = {};

    for (const enumKey in enumsSource) {
      const enumsOptions = enumsSource[enumKey] ?? {};
      options[enumKey] = Object.keys(enumsOptions).map((optionKey) => ({
        id: optionKey,
        label: enumsOptions[optionKey],
        value: optionKey,
      }));
    }

    return options;
  },
  getAuthToken: function () {
    if (typeof window == "undefined") {
      return;
    }
    return this.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY as string);
  },
  setAuthToken: function (value) {
    if (typeof window == "undefined") {
      return;
    }
    this.set(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY as string, value);
  },
  removeAuthToken: function () {
    if (typeof window == "undefined") {
      return;
    }
    this.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY as string);
  },
  getAuthUser: function () {
    if (typeof window == "undefined") {
      return;
    }
    let user = this.get(process.env.NEXT_PUBLIC_AUTH_USER_KEY as string, true);
    if (user) {
      user = toUser(user);
    }

    return user;
  },
  setAuthUser: function (user) {
    if (typeof window == "undefined") {
      return;
    }
    this.set(process.env.NEXT_PUBLIC_AUTH_USER_KEY as string, user, true);
  },
  removeAuthUser: function () {
    if (typeof window == "undefined") {
      return;
    }
    this.remove(process.env.NEXT_PUBLIC_AUTH_USER_KEY as string);
  },
};
