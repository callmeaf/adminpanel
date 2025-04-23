"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import ExchangesWrapper from "../widgets/ExchangesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IExchangesPageProps {}

const ExchangesPage: React.FC<IExchangesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <ExchangesWrapper />
    </DashboardLayout>
  );
};

export default ExchangesPage;
