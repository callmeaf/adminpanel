"use client";

import CoinForms from "../widgets/CoinForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toCoin, { ICoinModel } from "../models/Coin";
import useHttp from "@/modules/Base/hooks/use-http";
import { getCoinByKey } from "../requests/coin-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ICoinEditPageProps {}

const CoinEditPage: React.FC<ICoinEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [coin, setCoin] = React.useState<ICoinModel | undefined>(undefined);

  const { handle: handleGetCoinByKey, loading: loadingGetCoinByKey } = useHttp(
    moduleConfig,
    getCoinByKey,
    {
      onSuccess: (res) => {
        setCoin(toCoin(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetCoinByKey(
      {},
      {
        key: params.coinId,
      }
    );
  }, [params.coinId]);

  return (
    <DashboardLayout>
      <Show when={!!coin}>
        <Show.When>
          <CoinForms coinModel={coin} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetCoinByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default CoinEditPage;
