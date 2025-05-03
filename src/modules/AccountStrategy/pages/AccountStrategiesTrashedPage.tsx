"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountStrategiesWrapper from "../widgets/AccountStrategiesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountStrategiesTrashedPageProps {}

const AccountStrategiesTrashedPage: React.FC<IAccountStrategiesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategiesWrapper trashed />
    </DashboardLayout>
  );
};

export default AccountStrategiesTrashedPage;
