import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { IRoleModel } from "../models/Role";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";

interface IRoleInfoFormProps extends IForm {
  role?: IRoleModel;
}

const RoleInfoForm: React.FC<IRoleInfoFormProps> = ({
  onSubmit,
  loading,
  role,
}) => {
  const t = useTranslations("Role.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(EnumSource.ROLE);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      name: yup.string().required(v("required")),
      name_fa: yup.string().required(v("required")),
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
      name: role?.name,
      name_fa: role?.nameFa,
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Input
        {...register("name")}
        label={t("name_inp_label")}
        error={errors.name}
      />
      <Input
        {...register("name_fa")}
        label={t("name_fa_inp_label")}
        error={errors.name_fa}
      />
    </Form>
  );
};

export default RoleInfoForm;
