"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import MediaImport from "../widgets/MediaImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IMediaImportExcelPageProps {}

const MediaImportExcelPage: React.FC<IMediaImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <MediaImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default MediaImportExcelPage;
