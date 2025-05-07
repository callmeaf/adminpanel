"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import SocialsImport from "../widgets/SocialsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ISocialsImportExcelPageProps {}

const SocialsImportExcelPage: React.FC<ISocialsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <SocialsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default SocialsImportExcelPage;
