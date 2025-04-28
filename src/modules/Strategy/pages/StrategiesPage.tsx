"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import StrategiesWrapper from "../widgets/StrategiesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IStrategiesPageProps {}

const StrategiesPage: React.FC<IStrategiesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <StrategiesWrapper />
    </DashboardLayout>
  );
};

export default StrategiesPage;
