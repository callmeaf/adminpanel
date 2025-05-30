"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import PermissionsWrapper from "../widgets/PermissionsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IPermissionsTrashedPageProps {}

const PermissionsTrashedPage: React.FC<IPermissionsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <PermissionsWrapper trashed />
    </DashboardLayout>
  );
};

export default PermissionsTrashedPage;
