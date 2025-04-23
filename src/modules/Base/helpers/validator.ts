import { useTranslations } from "next-intl";
import { TestConfig } from "yup";

type TTranslate = ReturnType<typeof useTranslations>;

type TValidation<V> = (value: V, t: TTranslate) => TestConfig<any>;

type TValidationWithoutValue = (t: TTranslate) => TestConfig<any>;

interface IValidator {
  length: TValidation<number>;
  startsWith: TValidation<string>;
  onlyDigits: TValidationWithoutValue;
  oneOf: TValidation<any[]>;
}

export const validator: IValidator = {
  length: (value, t) => ({
    name: "length",
    message: t("length", { length: value }),
    test: (v) => v.toString().length === value,
  }),
  startsWith: (value, t) => ({
    name: "startsWith",
    message: t("starts_with", { value }),
    test: (v) => v.toString().startsWith(value),
  }),
  onlyDigits: (t) => ({
    name: "onlyDigits",
    message: t("only_digits"),
    test: (v) => /^\d+$/.test(v.toString()),
  }),
  oneOf: (options, t) => ({
    name: "oneOf",
    message: t("one_of", { options: options.join(", ") }),
    test: (v) =>
      options.findIndex((val) => val.toString() === v.toString()) > -1,
  }),
};
