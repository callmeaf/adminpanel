"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import AccountsWrapper from "../widgets/AccountsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IAccountsTrashedPageProps {}

const AccountsTrashedPage: React.FC<IAccountsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <AccountsWrapper trashed />
    </DashboardLayout>
  );
};

export default AccountsTrashedPage;
