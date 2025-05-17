"use client";

import MediaForms from "../widgets/MediaForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IMediaCreatePageProps {}

const MediaCreatePage: React.FC<IMediaCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <MediaForms />
    </DashboardLayout>
  );
};

export default MediaCreatePage;
