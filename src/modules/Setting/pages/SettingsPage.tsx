"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import SettingsWrapper from "../widgets/SettingsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ISettingsPageProps {}

const SettingsPage: React.FC<ISettingsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SettingsWrapper />
    </DashboardLayout>
  );
};

export default SettingsPage;
