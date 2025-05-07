import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ISocialModel } from "../models/Social";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";

interface ISocialInfoFormProps extends IForm {
  social?: ISocialModel;
}

const SocialInfoForm: React.FC<ISocialInfoFormProps> = ({
  onSubmit,
  loading,
  social,
}) => {
  const t = useTranslations("Social.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(EnumSource.SOCIAL);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      chat_id: yup.string().required(v("required")),
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
      chat_id: social?.chat_id,
      status: social?.statusObject(statuses),
      type: social?.typeObject(types),
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
        {...register("chat_id")}
        label={t("chat_id_inp_label")}
        error={errors.chat_id}
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

export default SocialInfoForm;
