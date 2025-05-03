"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountStrategiesWrapper from "../widgets/AccountStrategiesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountStrategiesPageProps {}

const AccountStrategiesPage: React.FC<IAccountStrategiesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategiesWrapper />
    </DashboardLayout>
  );
};

export default AccountStrategiesPage;
