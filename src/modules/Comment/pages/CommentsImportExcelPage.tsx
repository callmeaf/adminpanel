"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import CommentsImport from "../widgets/CommentsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ICommentsImportExcelPageProps {}

const CommentsImportExcelPage: React.FC<ICommentsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <CommentsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default CommentsImportExcelPage;
