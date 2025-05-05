"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import VersionsWrapper from "../widgets/VersionsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IVersionsTrashedPageProps {}

const VersionsTrashedPage: React.FC<IVersionsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <VersionsWrapper trashed />
    </DashboardLayout>
  );
};

export default VersionsTrashedPage;
