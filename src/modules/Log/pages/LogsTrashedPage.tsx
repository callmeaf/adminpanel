"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import LogsWrapper from "../widgets/LogsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ILogsTrashedPageProps {}

const LogsTrashedPage: React.FC<ILogsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <LogsWrapper trashed />
    </DashboardLayout>
  );
};

export default LogsTrashedPage;
