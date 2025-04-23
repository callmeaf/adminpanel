"use client";

import SettingForms from "../widgets/SettingForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ISettingCreatePageProps {}

const SettingCreatePage: React.FC<ISettingCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SettingForms />
    </DashboardLayout>
  );
};

export default SettingCreatePage;
