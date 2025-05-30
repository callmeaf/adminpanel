"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import RolesWrapper from "../widgets/RolesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IRolesPageProps {}

const RolesPage: React.FC<IRolesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <RolesWrapper />
    </DashboardLayout>
  );
};

export default RolesPage;
