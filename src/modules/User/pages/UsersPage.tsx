"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import UsersWrapper from "../widgets/UsersWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IUsersPageProps {}

const UsersPage: React.FC<IUsersPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <UsersWrapper />
    </DashboardLayout>
  );
};

export default UsersPage;
