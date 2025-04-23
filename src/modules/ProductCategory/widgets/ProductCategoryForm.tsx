import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useForm } from "react-hook-form";

interface IProductCategoryFormProps extends IForm {}

const ProductCategoryForm: React.FC<IProductCategoryFormProps> = ({
  onSubmit,
  loading,
}) => {
  const t = useTranslations("ProductCategory.Widgets.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      example: yup
        .string()
        .required(v("required")),
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
    <Form onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <Input
        {...register("example")}
        label={t("example_inp_label")}
        error={errors.example}
        type={"example"}
      />
    </Form>
  );
};

export default ProductCategoryForm;
