"use client";

import VersionForms from "../widgets/VersionForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IVersionCreatePageProps {}

const VersionCreatePage: React.FC<IVersionCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <VersionForms />
    </DashboardLayout>
  );
};

export default VersionCreatePage;
