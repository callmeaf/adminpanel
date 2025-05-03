"use client";

import AccountStrategyCoinForms from "../widgets/AccountStrategyCoinForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toAccountStrategyCoin, { IAccountStrategyCoinModel } from "../models/AccountStrategyCoin";
import useHttp from "@/modules/Base/hooks/use-http";
import { getAccountStrategyCoinByKey } from "../requests/account-strategy-coin-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IAccountStrategyCoinEditPageProps {}

const AccountStrategyCoinEditPage: React.FC<IAccountStrategyCoinEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [accountStrategyCoin, setAccountStrategyCoin] = React.useState<IAccountStrategyCoinModel | undefined>(undefined);

  const { handle: handleGetAccountStrategyCoinByKey, loading: loadingGetAccountStrategyCoinByKey } = useHttp(
    moduleConfig,
    getAccountStrategyCoinByKey,
    {
      onSuccess: (res) => {
        setAccountStrategyCoin(toAccountStrategyCoin(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetAccountStrategyCoinByKey(
      {},
      {
        key: params.accountStrategyCoinId,
      }
    );
  }, [params.accountStrategyCoinId]);

  return (
    <DashboardLayout>
      <Show when={!!accountStrategyCoin}>
        <Show.When>
          <AccountStrategyCoinForms accountStrategyCoinModel={accountStrategyCoin} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetAccountStrategyCoinByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default AccountStrategyCoinEditPage;
