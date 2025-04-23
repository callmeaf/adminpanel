import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import { validator } from "@/modules/Base/helpers/validator";
import useValidation from "@/modules/Base/hooks/use-validation";
import { IUserModel } from "../models/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";

interface IUserInfoFormProps extends IForm {
  user?: IUserModel;
}

const UserInfoForm: React.FC<IUserInfoFormProps> = ({
  onSubmit,
  loading,
  user,
}) => {
  const t = useTranslations("User.Widgets.Form");
  const { statuses, types } = localStorageArtisan.enums(EnumSource.USER);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      status: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(statuses, v)),
      type: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(types, v)),
      first_name: yup
        .string()
        .required(v("required"))
        .min(3, v("min_length", { value: 3 })),
      last_name: yup
        .string()
        .required(v("required"))
        .min(3, v("min_length", { value: 3 })),
      mobile: yup
        .string()
        .required(v("required"))
        .test(validator.startsWith("09", v))
        .test(validator.length(11, v)),
      email: yup.string().required(v("required")).email(v("email")),
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
      status: user?.statusObject(statuses),
      type: user?.typeObject(types),
      first_name: user?.firstName,
      last_name: user?.lastName,
      mobile: user?.mobile,
      email: user?.email,
    },
  });

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          status: data.status.value,
          type: data.type.value,
        })
      )}
      loading={loading}
      inStepper
    >
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
      <Input
        {...register("first_name")}
        label={t("first_name_inp_label")}
        error={errors.first_name}
      />

      <Input
        {...register("last_name")}
        label={t("last_name_inp_label")}
        error={errors.last_name}
      />

      <Input
        {...register("mobile")}
        label={t("mobile_inp_label")}
        error={errors.mobile}
      />
      <Input
        {...register("email")}
        label={t("email_inp_label")}
        error={errors.email}
      />
    </Form>
  );
};

export default UserInfoForm;
