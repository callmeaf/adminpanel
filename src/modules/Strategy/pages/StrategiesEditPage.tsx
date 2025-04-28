"use client";

import StrategyForms from "../widgets/StrategyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toStrategy, { IStrategyModel } from "../models/Strategy";
import useHttp from "@/modules/Base/hooks/use-http";
import { getStrategyByKey } from "../requests/strategy-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IStrategyEditPageProps {}

const StrategyEditPage: React.FC<IStrategyEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [strategy, setStrategy] = React.useState<IStrategyModel | undefined>(undefined);

  const { handle: handleGetStrategyByKey, loading: loadingGetStrategyByKey } = useHttp(
    moduleConfig,
    getStrategyByKey,
    {
      onSuccess: (res) => {
        setStrategy(toStrategy(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetStrategyByKey(
      {},
      {
        key: params.strategyId,
      }
    );
  }, [params.strategyId]);

  return (
    <DashboardLayout>
      <Show when={!!strategy}>
        <Show.When>
          <StrategyForms strategyModel={strategy} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetStrategyByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default StrategyEditPage;
