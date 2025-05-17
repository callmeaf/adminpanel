"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import MediaWrapper from "../widgets/MediaWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IMediaPageProps {}

const MediaPage: React.FC<IMediaPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <MediaWrapper />
    </DashboardLayout>
  );
};

export default MediaPage;
