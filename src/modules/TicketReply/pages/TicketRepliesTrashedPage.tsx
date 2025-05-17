"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import TicketRepliesWrapper from "../widgets/TicketRepliesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ITicketRepliesTrashedPageProps {}

const TicketRepliesTrashedPage: React.FC<ITicketRepliesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketRepliesWrapper trashed />
    </DashboardLayout>
  );
};

export default TicketRepliesTrashedPage;
