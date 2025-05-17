import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ITicketReplyModel } from "../models/TicketReply";
import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import { Grid2 } from "@mui/material";
import Dropzone from "@/modules/Base/components/forms/Dropzone";

interface ITicketReplyInfoFormProps extends IForm {
  ticketReply?: ITicketReplyModel;
}

const TicketReplyInfoForm: React.FC<ITicketReplyInfoFormProps> = ({
  onSubmit,
  loading,
  ticketReply,
}) => {
  const t = useTranslations("TicketReply.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(
    EnumSource.TICKET_REPLY
  );

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      content: yup
        .string()
        .nullable(v("required"))
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
      content: ticketReply?.content,
    },
  });

  const submitHandler = async (data: any) => {
    try {
      await onSubmit({
        ...data,
      });
      setValue("attachments", []);
    } catch (e) {}
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Grid2 size={12}>
        <Input
          {...register("content")}
          label={t("content_inp_label")}
          error={errors.content}
          multiline
          rows={5}
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
            />
          )}
        />
      </Grid2>
    </Form>
  );
};

export default TicketReplyInfoForm;
