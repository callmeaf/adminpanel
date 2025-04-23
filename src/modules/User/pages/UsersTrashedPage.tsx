"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import UsersWrapper from "../widgets/UsersWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IUsersTrashedPageProps {}

const UsersTrashedPage: React.FC<IUsersTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <UsersWrapper trashed />
    </DashboardLayout>
  );
};

export default UsersTrashedPage;
