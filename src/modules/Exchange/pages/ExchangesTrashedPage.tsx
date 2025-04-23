"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import ExchangesWrapper from "../widgets/ExchangesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IExchangesTrashedPageProps {}

const ExchangesTrashedPage: React.FC<IExchangesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <ExchangesWrapper trashed />
    </DashboardLayout>
  );
};

export default ExchangesTrashedPage;
