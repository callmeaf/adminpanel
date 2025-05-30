"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import RolesImport from "../widgets/RolesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IRolesImportExcelPageProps {}

const RolesImportExcelPage: React.FC<IRolesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <RolesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default RolesImportExcelPage;
