"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import AccountStrategiesImport from "../widgets/AccountStrategiesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IAccountStrategiesImportExcelPageProps {}

const AccountStrategiesImportExcelPage: React.FC<IAccountStrategiesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <AccountStrategiesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default AccountStrategiesImportExcelPage;
