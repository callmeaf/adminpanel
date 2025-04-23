import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";

interface IUserPasswordFormProps extends IForm {}

const UserPasswordForm: React.FC<IUserPasswordFormProps> = ({
  onSubmit,
  loading,
}) => {
  const t = useTranslations("User.Widgets.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      password: yup
        .string()
        .required(v("required"))
        .min(8, v("min_length", { value: 8 })),
      password_confirmation: yup
        .string()
        .required(v("required"))
        .min(8, v("min_length", { value: 8 })),
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} loading={loading} inStepper>
      <Input
        {...register("password")}
        label={t("password_inp_label")}
        error={errors.password}
        type={"password"}
      />

      <Input
        {...register("password_confirmation")}
        label={t("password_confirmation_inp_label")}
        error={errors.password_confirmation}
        type={"password"}
      />
    </Form>
  );
};

export default UserPasswordForm;
