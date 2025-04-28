"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import StrategiesImport from "../widgets/StrategiesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IStrategiesImportExcelPageProps {}

const StrategiesImportExcelPage: React.FC<IStrategiesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <StrategiesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default StrategiesImportExcelPage;
