"use client";

import ExchangesForm from "../widgets/ExchangesForm";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toExchange, { IExchangeModel } from "../models/Exchange";
import useHttp from "@/modules/Base/hooks/use-http";
import { getExchangeByKey } from "../requests/exchange-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IExchangeEditPageProps {}

const ExchangeEditPage: React.FC<IExchangeEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [exchange, setExchange] = React.useState<IExchangeModel | undefined>(undefined);

  const { handle: handleGetExchangeByKey, loading: loadingGetExchangeByKey } = useHttp(
    moduleConfig,
    getExchangeByKey,
    {
      onSuccess: (res) => {
        setExchange(toExchange(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetExchangeByKey(
      {},
      {
        key: params.exchangeId,
      }
    );
  }, [params.exchangeId]);

  return (
    <DashboardLayout>
      <Show when={!!exchange}>
        <Show.When>
          <ExchangesForm exchangeModel={exchange} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetExchangeByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default ExchangeEditPage;
