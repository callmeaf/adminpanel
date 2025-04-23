import { IOption } from "../components/forms/AutoComplete";
import { jsonArtisan } from "./json-artisan";

type TEnumsReturnType = Record<string, IOption[]>;

export enum EnumSource {
  USER = "user",
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
}

export const localStorageArtisan: ILocalStorageArtisan = {
  get: (key, parseJson) => {
    let value = `${localStorage.getItem(key)}`;

    if (parseJson) {
      value = jsonArtisan.parse(value);
    }

    return value;
  },
  isEmpty: function (key) {
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
};
