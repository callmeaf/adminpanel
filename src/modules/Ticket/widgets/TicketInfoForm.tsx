import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ITicketModel } from "../models/Ticket";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import { Grid2 } from "@mui/material";
import Dropzone from "@/modules/Base/components/forms/Dropzone";

interface ITicketInfoFormProps extends IForm {
  ticket?: ITicketModel;
}

const TicketInfoForm: React.FC<ITicketInfoFormProps> = ({
  onSubmit,
  loading,
  ticket,
}) => {
  const t = useTranslations("Ticket.Widgets.Form");

  const { statuses, types, subjects } = localStorageArtisan.enums(
    EnumSource.TICKET
  );

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      title: yup.string().required(v("required")),
      type: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(types, v)),
      subject: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(subjects, v)),
      content: yup
        .string()
        .required(v("required"))
        .max(700, v("max_length", { value: 700 })),
      attachments: yup.array().nullable(),
    })
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: ticket?.title,
      type: ticket?.typeObject(types),
      subject: ticket?.subjectObject(subjects),
      content: ticket?.content,
    },
  });

  const submitHandler = async (data: any) => {
    try {
      onSubmit({
        ...data,
        subject: data.subject?.value,
        type: data.type?.value,
      });

      setValue("attachments", []);
    } catch (e) {}
  };

  return (
    <Form
      onSubmit={handleSubmit(submitHandler)}
      loading={loading}
      submitBtn={ticket ? null : undefined}
    >
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
            disabled={!!ticket}
          />
        )}
      />
      <Controller
        control={control}
        name="subject"
        render={({ field }) => (
          // @ts-ignore
          <AutoComplete
            {...field}
            label={t("subject_inp_label")}
            error={errors.subject}
            options={subjects}
            disabled={!!ticket}
          />
        )}
      />
      <Grid2 size={12}>
        <Input
          {...register("title")}
          label={t("title_inp_label")}
          error={errors.title}
          disabled={!!ticket}
        />
      </Grid2>
      <Grid2 size={12}>
        <Input
          {...register("content")}
          label={t("content_inp_label")}
          error={errors.content}
          multiline
          rows={5}
          disabled={!!ticket}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          control={control}
          name="attachments"
          render={({ field }) => (
            <Dropzone
              {...field}
              label={t("attachments_inp_label")}
              error={errors.attachments}
              disabled={!!ticket}
              uploadedFiles={ticket?.attachments}
            />
          )}
        />
      </Grid2>
    </Form>
  );
};

export default TicketInfoForm;
