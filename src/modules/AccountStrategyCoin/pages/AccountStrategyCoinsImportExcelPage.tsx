"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import AccountStrategyCoinsImport from "../widgets/AccountStrategyCoinsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IAccountStrategyCoinsImportExcelPageProps {}

const AccountStrategyCoinsImportExcelPage: React.FC<IAccountStrategyCoinsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <AccountStrategyCoinsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default AccountStrategyCoinsImportExcelPage;
