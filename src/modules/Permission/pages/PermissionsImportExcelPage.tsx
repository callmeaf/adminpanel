"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import PermissionsImport from "../widgets/PermissionsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IPermissionsImportExcelPageProps {}

const PermissionsImportExcelPage: React.FC<IPermissionsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <PermissionsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default PermissionsImportExcelPage;
