"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import UsersImport from "../widgets/UsersImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IUsersImportExcelPageProps {}

const UsersImportExcelPage: React.FC<IUsersImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <UsersImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default UsersImportExcelPage;
