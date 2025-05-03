"use client";

import AccountStrategyCoinForms from "../widgets/AccountStrategyCoinForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IAccountStrategyCoinCreatePageProps {}

const AccountStrategyCoinCreatePage: React.FC<IAccountStrategyCoinCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountStrategyCoinForms />
    </DashboardLayout>
  );
};

export default AccountStrategyCoinCreatePage;
