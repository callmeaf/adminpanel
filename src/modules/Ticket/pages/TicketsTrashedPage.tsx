"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import TicketsWrapper from "../widgets/TicketsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ITicketsTrashedPageProps {}

const TicketsTrashedPage: React.FC<ITicketsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketsWrapper trashed />
    </DashboardLayout>
  );
};

export default TicketsTrashedPage;
