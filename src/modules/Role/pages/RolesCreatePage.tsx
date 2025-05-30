"use client";

import RoleForms from "../widgets/RoleForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IRoleCreatePageProps {}

const RoleCreatePage: React.FC<IRoleCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <RoleForms />
    </DashboardLayout>
  );
};

export default RoleCreatePage;
