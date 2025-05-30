"use client";

import PermissionForms from "../widgets/PermissionForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IPermissionCreatePageProps {}

const PermissionCreatePage: React.FC<IPermissionCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <PermissionForms />
    </DashboardLayout>
  );
};

export default PermissionCreatePage;
