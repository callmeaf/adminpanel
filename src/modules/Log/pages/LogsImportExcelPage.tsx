"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import LogsImport from "../widgets/LogsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ILogsImportExcelPageProps {}

const LogsImportExcelPage: React.FC<ILogsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <LogsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default LogsImportExcelPage;
