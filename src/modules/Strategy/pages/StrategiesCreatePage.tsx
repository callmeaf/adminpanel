"use client";

import StrategyForms from "../widgets/StrategyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IStrategyCreatePageProps {}

const StrategyCreatePage: React.FC<IStrategyCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <StrategyForms />
    </DashboardLayout>
  );
};

export default StrategyCreatePage;
