"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import VersionsWrapper from "../widgets/VersionsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IVersionsPageProps {}

const VersionsPage: React.FC<IVersionsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <VersionsWrapper />
    </DashboardLayout>
  );
};

export default VersionsPage;
