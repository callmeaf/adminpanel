"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useTranslations } from "next-intl";
import toExchange, { IExchangeModel } from "../models/Exchange";
import useHttp from "@/modules/Base/hooks/use-http";
import { storeExchange, updateExchange } from "../requests/exchange-requests";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import ExchangesForm from "../widgets/ExchangesForm";

interface IExchangeCreatePageProps {}

const ExchangeCreatePage: React.FC<IExchangeCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  const t = useTranslations("Exchange.Widgets.Form");

  const [exchange, setExchange] = React.useState<IExchangeModel | undefined>(
    undefined
  );

  const { handle: handleStoreExchange, loading: loadingStoreExchange } =
    useHttp(moduleConfig, storeExchange, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeExchange.success_message"),
          },
        });
        setExchange(toExchange(res.data));
      },
    });

  const storeExchangeHandler = (data: any) => handleStoreExchange(data);

  return (
    <DashboardLayout>
      <ExchangesForm
        loading={loadingStoreExchange}
        onSubmit={storeExchangeHandler}
        exchange={exchange}
      />
    </DashboardLayout>
  );
};

export default ExchangeCreatePage;
