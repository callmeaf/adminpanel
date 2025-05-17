"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import TicketsWrapper from "../widgets/TicketsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ITicketsPageProps {}

const TicketsPage: React.FC<ITicketsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketsWrapper />
    </DashboardLayout>
  );
};

export default TicketsPage;
