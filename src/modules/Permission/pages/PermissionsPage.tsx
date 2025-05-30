"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import PermissionsWrapper from "../widgets/PermissionsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IPermissionsPageProps {}

const PermissionsPage: React.FC<IPermissionsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <PermissionsWrapper />
    </DashboardLayout>
  );
};

export default PermissionsPage;
