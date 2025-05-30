"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import RolesWrapper from "../widgets/RolesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IRolesTrashedPageProps {}

const RolesTrashedPage: React.FC<IRolesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <RolesWrapper trashed />
    </DashboardLayout>
  );
};

export default RolesTrashedPage;
