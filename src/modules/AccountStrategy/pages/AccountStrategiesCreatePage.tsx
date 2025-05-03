"use client";

import AccountStrategyForms from "../widgets/AccountStrategyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IAccountStrategyCreatePageProps {}

const AccountStrategyCreatePage: React.FC<IAccountStrategyCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategyForms />
    </DashboardLayout>
  );
};

export default AccountStrategyCreatePage;
