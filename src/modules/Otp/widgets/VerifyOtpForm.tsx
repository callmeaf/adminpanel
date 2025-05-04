import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import { validator } from "@/modules/Base/helpers/validator";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";

interface IOtpFormProps extends IForm {
  identifier: string;
}

const OtpForm: React.FC<IOtpFormProps> = ({
  loading,
  onSubmit,
  identifier,
}) => {
  const t = useTranslations("Auth.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      identifier: yup.string().required(v("required")),
      code: yup
        .string()
        .required(v("required"))
        .test(validator.onlyDigits(v))
        .test(validator.length(5, v)),
    })
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      identifier,
    },
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitBtnLabel={t("verify_otp_btn_label")}
    >
      <Grid2 size={12}>
        <Input
          {...register("code")}
          label={t("code_inp_label")}
          error={errors.code}
          type="number"
          className="number-inputs-without-spinners"
        />
      </Grid2>
    </Form>
  );
};

export default OtpForm;
