"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import SettingsImport from "../widgets/SettingsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ISettingsImportExcelPageProps {}

const SettingsImportExcelPage: React.FC<ISettingsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <SettingsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default SettingsImportExcelPage;
