"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import AccountsImport from "../widgets/AccountsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IAccountsImportExcelPageProps {}

const AccountsImportExcelPage: React.FC<IAccountsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <AccountsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default AccountsImportExcelPage;
