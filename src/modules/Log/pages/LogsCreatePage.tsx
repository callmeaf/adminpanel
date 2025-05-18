"use client";

import LogForms from "../widgets/LogForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ILogCreatePageProps {}

const LogCreatePage: React.FC<ILogCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <LogForms />
    </DashboardLayout>
  );
};

export default LogCreatePage;
