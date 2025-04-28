"use client";

import AccountForms from "../widgets/AccountForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toAccount, { IAccountModel } from "../models/Account";
import useHttp from "@/modules/Base/hooks/use-http";
import { getAccountByKey } from "../requests/account-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IAccountEditPageProps {}

const AccountEditPage: React.FC<IAccountEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [account, setAccount] = React.useState<IAccountModel | undefined>(undefined);

  const { handle: handleGetAccountByKey, loading: loadingGetAccountByKey } = useHttp(
    moduleConfig,
    getAccountByKey,
    {
      onSuccess: (res) => {
        setAccount(toAccount(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetAccountByKey(
      {},
      {
        key: params.accountId,
      }
    );
  }, [params.accountId]);

  return (
    <DashboardLayout>
      <Show when={!!account}>
        <Show.When>
          <AccountForms accountModel={account} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetAccountByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default AccountEditPage;
