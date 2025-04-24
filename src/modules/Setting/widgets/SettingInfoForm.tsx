import Form, { IForm } from "@/modules/Base/components/forms/Form";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ISettingModel, settingValuesByKey } from "../models/Setting";
import AutoComplete, {
  IOption,
} from "@/modules/Base/components/forms/AutoComplete";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import Input from "@/modules/Base/components/forms/Input";
import { validator } from "@/modules/Base/helpers/validator";
import { Grid2 } from "@mui/material";

interface ISettingFormProps extends IForm {
  setting?: ISettingModel;
}

const SettingForm: React.FC<ISettingFormProps> = ({
  onSubmit,
  loading,
  setting,
}) => {
  const t = useTranslations("Setting.Widgets.Form");

  const { keys } = localStorageArtisan.enums(EnumSource.SETTING);
  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      key: yup.object().required(v("required")).test(validator.oneOf(keys, v)),
      values: yup.lazy((obj) => {
        const shape: any = {};
        for (const key in obj) {
          shape[key] = yup.string().nullable();
        }

        return yup.object().shape(shape);
      }),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      key: setting?.keyObject(keys),
      values: setting?.values,
    },
  });

  const currentKey: IOption | undefined = watch("key") as IOption;

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      key: data.key.value,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Controller
        control={control}
        name="key"
        render={({ field }) => (
          <AutoComplete
            {...field}
            label={t("key_inp_label")}
            error={errors.key}
            options={keys}
            disabled={!!setting}
          />
        )}
      />
      <Grid2 size={12}></Grid2>
      {currentKey &&
        currentKey?.value &&
        settingValuesByKey[currentKey.value].map((item) => (
          <Input
            key={item.name}
            {...register(`values[${item.name}]`)}
            label={item.label}
            error={errors.values?.[item.name]}
          />
        ))}
      <Grid2 size={12}></Grid2>
    </Form>
  );
};

export default SettingForm;
