"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import VersionsImport from "../widgets/VersionsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IVersionsImportExcelPageProps {}

const VersionsImportExcelPage: React.FC<IVersionsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <VersionsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default VersionsImportExcelPage;
