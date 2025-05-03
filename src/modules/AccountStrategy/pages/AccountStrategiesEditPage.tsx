"use client";

import AccountStrategyForms from "../widgets/AccountStrategyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toAccountStrategy, { IAccountStrategyModel } from "../models/AccountStrategy";
import useHttp from "@/modules/Base/hooks/use-http";
import { getAccountStrategyByKey } from "../requests/account-strategy-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IAccountStrategyEditPageProps {}

const AccountStrategyEditPage: React.FC<IAccountStrategyEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [accountStrategy, setAccountStrategy] = React.useState<IAccountStrategyModel | undefined>(undefined);

  const { handle: handleGetAccountStrategyByKey, loading: loadingGetAccountStrategyByKey } = useHttp(
    moduleConfig,
    getAccountStrategyByKey,
    {
      onSuccess: (res) => {
        setAccountStrategy(toAccountStrategy(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetAccountStrategyByKey(
      {},
      {
        key: params.accountStrategyId,
      }
    );
  }, [params.accountStrategyId]);

  return (
    <DashboardLayout>
      <Show when={!!accountStrategy}>
        <Show.When>
          <AccountStrategyForms accountStrategyModel={accountStrategy} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetAccountStrategyByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default AccountStrategyEditPage;
