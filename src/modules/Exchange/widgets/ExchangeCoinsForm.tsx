import * as React from "react";
import useHttp from "@/modules/Base/hooks/use-http";
import coinModuleConfig from "@/modules/Coin/module.config";
import { getCoins } from "@/modules/Coin/requests/coin-requests";
import toCoin from "@/modules/Coin/models/Coin";
import AutoComplete, {
  IOption,
} from "@/modules/Base/components/forms/AutoComplete";
import { IExchangeModel } from "../models/Exchange";
import useValidation from "@/modules/Base/hooks/use-validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form, { IForm } from "@/modules/Base/components/forms/Form";
import { useTranslations } from "next-intl";
import { Grid2 } from "@mui/material";

interface IExchangeCoinsFormProps extends IForm {
  exchange: IExchangeModel;
}

const ExchangeCoinsForm: React.FC<IExchangeCoinsFormProps> = ({
  exchange,
  loading,
  onSubmit,
}) => {
  const t = useTranslations("Exchange.Widgets.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      coins_symbols: yup.array().required(v("required")),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      coins_symbols: [],
    },
  });

  const [coins, setCoins] = React.useState<IOption[]>([]);
  const { handle: handleGetCoins, loading: loadingGetCoins } = useHttp(
    coinModuleConfig,
    getCoins,
    {
      onSuccess: (res) => {
        setCoins(
          res.data
            .map((item) => toCoin(item))
            .map((item) => ({
              id: item.id,
              label: item.symbol,
              value: item.id,
            }))
        );
      },
    }
  );

  React.useEffect(() => {
    handleGetCoins({
      per_page: 100,
    });
  }, []);

  React.useEffect(() => {
    if (exchange && coins.length) {
      setValue("coins_symbols", exchange.coinsArray(coins) ?? []);
    }
  }, [coins.length]);

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      coins_symbols: data.coins_symbols.map((item: IOption) => item.value),
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Grid2 size={12}>
        <Controller
          control={control}
          name="coins_symbols"
          render={({ field }) => (
            <AutoComplete
              {...field}
              label={t("coins_symbols_inp_label")}
              error={errors.coins_symbols}
              options={coins}
              loading={loadingGetCoins}
              multiple
            />
          )}
        />
      </Grid2>
    </Form>
  );
};

export default ExchangeCoinsForm;
