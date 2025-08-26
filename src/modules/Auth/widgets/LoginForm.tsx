import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidation from "@/modules/Base/hooks/use-validation";
import { useTranslations } from "next-intl";
import { Grid2 } from "@mui/material";

interface ILoginFormProps extends IForm {}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit, loading }) => {
  const t = useTranslations("Auth.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      identifier: yup.string().required(v("required")),
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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitBtnLabel={t("login_btn_label")}
    >
      <Grid2 size={12}>
        <Input
          {...register("identifier")}
          label={t("identifier_inp_label")}
          error={errors.identifier}
        />
      </Grid2>
    </Form>
  );
};

export default LoginForm;
