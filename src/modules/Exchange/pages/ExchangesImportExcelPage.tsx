"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import ExchangesImport from "../widgets/ExchangesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IExchangesImportExcelPageProps {}

const ExchangesImportExcelPage: React.FC<IExchangesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <ExchangesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default ExchangesImportExcelPage;
