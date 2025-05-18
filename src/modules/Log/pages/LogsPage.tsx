"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import LogsWrapper from "../widgets/LogsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ILogsPageProps {}

const LogsPage: React.FC<ILogsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <LogsWrapper />
    </DashboardLayout>
  );
};

export default LogsPage;
