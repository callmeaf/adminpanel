"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountStrategyCoinsWrapper from "../widgets/AccountStrategyCoinsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountStrategyCoinsPageProps {}

const AccountStrategyCoinsPage: React.FC<IAccountStrategyCoinsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategyCoinsWrapper />
    </DashboardLayout>
  );
};

export default AccountStrategyCoinsPage;
