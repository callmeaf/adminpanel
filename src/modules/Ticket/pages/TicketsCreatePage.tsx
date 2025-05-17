"use client";

import TicketForms from "../widgets/TicketForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ITicketCreatePageProps {}

const TicketCreatePage: React.FC<ITicketCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <TicketForms />
    </DashboardLayout>
  );
};

export default TicketCreatePage;
