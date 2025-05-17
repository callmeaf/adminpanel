import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ISocialBotModel } from "../models/SocialBot";
import AutoComplete, {
  IOption,
} from "@/modules/Base/components/forms/AutoComplete";
import { validator } from "@/modules/Base/helpers/validator";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import socialModuleConfig from "@/modules/Social/module.config";
import { getSocials } from "@/modules/Social/requests/social-requests";
import useHttp from "@/modules/Base/hooks/use-http";
import toSocial from "@/modules/Social/models/Social";
import { ModelStatus } from "@/modules/Base/interfaces/model-interface";
import { Grid2 } from "@mui/material";

interface ISocialBotInfoFormProps extends IForm {
  socialBot?: ISocialBotModel;
}

const SocialBotInfoForm: React.FC<ISocialBotInfoFormProps> = ({
  onSubmit,
  loading,
  socialBot,
}) => {
  const t = useTranslations("SocialBot.Widgets.Form");

  const { statuses, types } = localStorageArtisan.enums(EnumSource.SOCIAL_BOT);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      social_id: yup.object().required(v("required")),
      status: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(statuses, v)),
      type: yup
        .object()
        .required(v("required"))
        .test(validator.oneOf(types, v)),
      name: yup.string().required(v("required")),
      token: yup.string().required(v("required")),
      footer: yup.string().nullable(),
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
      social_id: socialBot?.social_id,
      name: socialBot?.name,
      token: socialBot?.token,
      status: socialBot?.statusObject(statuses),
      type: socialBot?.typeObject(types),
      footer: socialBot?.footer,
    },
  });

  const submitHandler = (data: any) => {
    return onSubmit({
      ...data,
      status: data.status.value,
      type: data.type.value,
      social_id: data.social_id.value,
    });
  };

  // Social == start
  const [socials, setSocials] = React.useState<IOption[]>([]);
  const { handle: handleGetSocials, loading: loadingGetSocials } = useHttp(
    socialModuleConfig,
    getSocials,
    {
      onSuccess: (res) => {
        setSocials(
          res.data
            .map((item) => toSocial(item))
            .map((item) => ({
              id: item.id,
              label: item.chat_id,
              value: item.id,
            }))
        );
      },
    }
  );
  React.useEffect(() => {
    handleGetSocials({
      status: ModelStatus.ACTIVE,
    });
  }, []);
  React.useEffect(() => {
    if (socials.length && socialBot) {
      const socialIdObject = socialBot.socialIdObject(socials);
      if (socialIdObject) {
        setValue("social_id", socialIdObject);
      }
    }
  }, [socials.length]);
  // Social == end

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Controller
        control={control}
        name="social_id"
        render={({ field }) => (
          // @ts-ignore
          <AutoComplete
            {...field}
            label={t("social_id_inp_label")}
            error={errors.social_id}
            options={socials}
            loading={loadingGetSocials}
          />
        )}
      />
      <Controller
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
      />
      <Input
        {...register("name")}
        label={t("name_inp_label")}
        error={errors.name}
      />
      <Input
        {...register("token")}
        label={t("token_inp_label")}
        error={errors.token}
      />
      <Grid2 size={12}>
        <Input
          {...register("footer")}
          label={t("footer_inp_label")}
          error={errors.footer}
          multiline
          rows={5}
        />
      </Grid2>
    </Form>
  );
};

export default SocialBotInfoForm;
