"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountStrategyCoinsWrapper from "../widgets/AccountStrategyCoinsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountStrategyCoinsTrashedPageProps {}

const AccountStrategyCoinsTrashedPage: React.FC<IAccountStrategyCoinsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategyCoinsWrapper trashed />
    </DashboardLayout>
  );
};

export default AccountStrategyCoinsTrashedPage;
