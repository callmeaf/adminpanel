"use client";

import CoinForms from "../widgets/CoinForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ICoinCreatePageProps {}

const CoinCreatePage: React.FC<ICoinCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <CoinForms />
    </DashboardLayout>
  );
};

export default CoinCreatePage;
