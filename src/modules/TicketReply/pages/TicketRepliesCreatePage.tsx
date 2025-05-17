"use client";

import TicketReplyForms from "../widgets/TicketReplyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ITicketReplyCreatePageProps {}

const TicketReplyCreatePage: React.FC<ITicketReplyCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketReplyForms />
    </DashboardLayout>
  );
};

export default TicketReplyCreatePage;
