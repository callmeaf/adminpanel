"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import TicketsImport from "../widgets/TicketsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ITicketsImportExcelPageProps {}

const TicketsImportExcelPage: React.FC<ITicketsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <TicketsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default TicketsImportExcelPage;
