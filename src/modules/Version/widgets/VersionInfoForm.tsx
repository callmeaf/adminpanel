import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { IVersionModel } from "../models/Version";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import { Grid2 } from "@mui/material";
import TextEditor from "@/modules/Base/components/forms/TextEditor";

interface IVersionInfoFormProps extends IForm {
  version?: IVersionModel;
}

const VersionInfoForm: React.FC<IVersionInfoFormProps> = ({
  onSubmit,
  loading,
  version,
}) => {
  const t = useTranslations("Version.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(EnumSource.VERSION);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      id: yup.string().required(v("required")),
      content: yup.string().required(v("required")),
      // status: yup
      //   .object()
      //   .required(v("required"))
      //   .test(validator.oneOf(statuses, v)),
      // type: yup
      //   .object()
      //   .required(v("required"))
      //   .test(validator.oneOf(types, v)),
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
      id: version?.id,
      content: version?.content,
      // status: version?.statusObject(statuses),
      // type: version?.typeObject(types),
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Input {...register("id")} label={t("id_inp_label")} error={errors.id} />
      <Grid2>
        <TextEditor
          label={t("content_inp_label")}
          {...register("content")}
          error={errors.content}
          defaultValue={defaultValues.content}
        />
      </Grid2>
      {/* <Controller
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
      /> */}
    </Form>
  );
};

export default VersionInfoForm;
