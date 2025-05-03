import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller,useForm } from "react-hook-form";
import { IAccountStrategyCoinModel } from "../models/AccountStrategyCoin";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import { EnumSource, localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";

interface IAccountStrategyCoinInfoFormProps extends IForm {
  accountStrategyCoin?: IAccountStrategyCoinModel;
}

const AccountStrategyCoinInfoForm: React.FC<IAccountStrategyCoinInfoFormProps> = ({
  onSubmit,
  loading,
  accountStrategyCoin,
}) => {
  const t = useTranslations("AccountStrategyCoin.Widgets.Form");

 const {
    statuses,
    types,
  } = localStorageArtisan.enums(EnumSource.ACCOUNT_STRATEGY_COIN)

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      example: yup
        .string()
        .required(v("required")),
           status: yup.object().required(v('required')).test(validator.oneOf(statuses,v)),
      type: yup.object().required(v('required')).test(validator.oneOf(types,v))
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
      example: accountStrategyCoin.example,
      status: accountStrategyCoin?.statusObject(statuses),
      type: accountStrategyCoin?.typeObject(types),
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
    });


  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Input
        {...register("example")}
        label={t("example_inp_label")}
        error={errors.example}
      />
         <Controller
        control={control}
        name="status"
        render={({ field }) => (
                    // @ts-ignore
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
                    // @ts-ignore
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

export default AccountStrategyCoinInfoForm;
