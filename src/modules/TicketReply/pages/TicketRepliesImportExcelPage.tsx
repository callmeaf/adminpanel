"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import TicketRepliesImport from "../widgets/TicketRepliesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ITicketRepliesImportExcelPageProps {}

const TicketRepliesImportExcelPage: React.FC<ITicketRepliesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <TicketRepliesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default TicketRepliesImportExcelPage;
