"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountsWrapper from "../widgets/AccountsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountsPageProps {}

const AccountsPage: React.FC<IAccountsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountsWrapper />
    </DashboardLayout>
  );
};

export default AccountsPage;
