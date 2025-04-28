"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import StrategiesWrapper from "../widgets/StrategiesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IStrategiesTrashedPageProps {}

const StrategiesTrashedPage: React.FC<IStrategiesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <StrategiesWrapper trashed />
    </DashboardLayout>
  );
};

export default StrategiesTrashedPage;
