import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ICommentModel } from "../models/Comment";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import { Avatar, Box, Grid2, Typography } from "@mui/material";

interface ICommentInfoFormProps extends IForm {
  comment?: ICommentModel;
}

const CommentInfoForm: React.FC<ICommentInfoFormProps> = ({
  onSubmit,
  loading,
  comment,
}) => {
  const t = useTranslations("Comment.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(EnumSource.COMMENT);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      status: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(statuses, v)),
      type: yup.object().nullable().test(validator.oneOf(types, v)),
      content: yup
        .string()
        .required(v("required"))
        .max(700, v("max_length", { value: 700 })),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: comment?.statusObject(statuses),
      type: comment?.typeObject(types),
      content: comment?.content as string,
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      status: data.status?.value,
      type: data.type?.value,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Grid2 size={12}>
        <Avatar src={comment?.author?.image?.url ?? undefined}>
          {comment.authorIdentifier.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="body1">{comment.authorIdentifier}</Typography>
      </Grid2>
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
            disabled={!!comment?.parentId}
          />
        )}
      />
      <Grid2 size={12}>
        <Input
          {...register("content")}
          label={t("content_inp_label")}
          error={errors.content}
          multiline
          rows={5}
        />
      </Grid2>
    </Form>
  );
};

export default CommentInfoForm;
