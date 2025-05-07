"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import SocialBotsImport from "../widgets/SocialBotsImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface ISocialBotsImportExcelPageProps {}

const SocialBotsImportExcelPage: React.FC<ISocialBotsImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <SocialBotsImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default SocialBotsImportExcelPage;
