"use client";

import AccountForms from "../widgets/AccountForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IAccountCreatePageProps {}

const AccountCreatePage: React.FC<IAccountCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountForms />
    </DashboardLayout>
  );
};

export default AccountCreatePage;
