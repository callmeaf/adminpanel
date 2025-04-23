import AutoComplete from "@/modules/Base/components/forms/AutoComplete";
import Form, { IForm } from "@/modules/Base/components/forms/Form";
import Input from "@/modules/Base/components/forms/Input";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import { validator } from "@/modules/Base/helpers/validator";
import useValidation from "@/modules/Base/hooks/use-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { IExchangeModel } from "../models/Exchange";

interface IExchangesFormProps extends IForm {
  exchange?: IExchangeModel;
}

const ExchangesForm: React.FC<IExchangesFormProps> = ({
  onSubmit,
  loading,
  exchange,
}) => {
  const t = useTranslations("Exchange.Widgets.Form");
  const { statuses, types } = localStorageArtisan.enums(EnumSource.EXCHANGE);

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      name: yup.string().required(v("required")),
      status: yup.object().test(validator.oneOf(statuses, v)),
      type: yup.object().test(validator.oneOf(types, v)),
      site_url: yup.string().required(v("required")),
      api_url: yup.string().required(v("required")),
      maker_fee_percent: yup.string().required(v("required")),
      taker_fee_percent: yup.string().required(v("required")),
      content: yup.string().required(v("required")),
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
      name: exchange?.name,
      status: exchange?.statusObject(statuses),
      type: exchange?.typeObject(types),
      site_url: exchange?.siteUrl,
      api_url: exchange?.apiUrl,
      maker_fee_percent: exchange?.makerFeePercent,
      taker_fee_percent: exchange?.takerFeePercent,
      content: exchange?.content,
    },
  });

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      status: data.status.value,
      type: data.type.value,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Input
        {...register("name")}
        label={t("name_inp_label")}
        error={errors.name}
      />
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
        {...register("site_url")}
        label={t("site_url_inp_label")}
        error={errors.site_url}
      />
      <Input
        {...register("api_url")}
        label={t("api_url_inp_label")}
        error={errors.api_url}
      />
      <Grid2 size={{ xs: 12, md: 6, lg: 2 }}>
        <Input
          {...register("maker_fee_percent")}
          label={t("maker_fee_percent_inp_label")}
          error={errors.maker_fee_percent}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 2 }}>
        <Input
          {...register("taker_fee_percent")}
          label={t("taker_fee_percent_inp_label")}
          error={errors.taker_fee_percent}
        />
      </Grid2>
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

export default ExchangesForm;
