"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import SocialBotsWrapper from "../widgets/SocialBotsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ISocialBotsPageProps {}

const SocialBotsPage: React.FC<ISocialBotsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialBotsWrapper />
    </DashboardLayout>
  );
};

export default SocialBotsPage;
