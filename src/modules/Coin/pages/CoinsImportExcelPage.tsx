"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import CoinsImport from "../widgets/CoinsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ICoinsImportExcelPageProps {}

const CoinsImportExcelPage: React.FC<ICoinsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <CoinsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default CoinsImportExcelPage;
