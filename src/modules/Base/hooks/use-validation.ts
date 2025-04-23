import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as yupInstance from "yup";

type TUseValidation = <T extends yupInstance.AnyObject>(
  rules: (
    yup: typeof yupInstance,
    v: ReturnType<typeof useTranslations>
  ) => yupInstance.ObjectSchema<T>
) => {
  v: ReturnType<typeof useTranslations>;
  schema: yupInstance.ObjectSchema<T>;
};

const useValidation: TUseValidation = (rules) => {
  const v = useTranslations("Base.Validations");

  const schema = useMemo(() => rules(yupInstance, v), []);
  return {
    v,
    schema,
  };
};

export default useValidation;
