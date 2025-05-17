"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import TicketRepliesWrapper from "../widgets/TicketRepliesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ITicketRepliesPageProps {}

const TicketRepliesPage: React.FC<ITicketRepliesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketRepliesWrapper />
    </DashboardLayout>
  );
};

export default TicketRepliesPage;
