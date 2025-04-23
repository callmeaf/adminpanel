import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ICoinModel } from "../models/Coin";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";

interface ICoinFormProps extends IForm {
  coin?: ICoinModel;
}

const CoinForm: React.FC<ICoinFormProps> = ({ onSubmit, loading, coin }) => {
  const t = useTranslations("Coin.Widgets.Form");
  const { statuses, types } = localStorageArtisan.enums(EnumSource.COIN);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      symbol: yup.string().required(v("required")).test(validator.uppercase(v)),
      status: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(statuses, v)),
      type: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(types, v)),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      symbol: coin?.symbol,
      status: coin?.statusObject(statuses),
      type: coin?.typeObject(types),
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      status: data.status.value,
      type: data.type.value,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Input
        {...register("symbol")}
        label={t("symbol_inp_label")}
        error={errors.symbol}
        type={"symbol"}
      />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <AutoComplete
            {...field}
            label={t("status_inp_label")}
            error={errors.status}
            options={statuses}
          />
        )}
      />
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <AutoComplete
            {...field}
            label={t("type_inp_label")}
            error={errors.type}
            options={types}
          />
        )}
      />
    </Form>
  );
};

export default CoinForm;
