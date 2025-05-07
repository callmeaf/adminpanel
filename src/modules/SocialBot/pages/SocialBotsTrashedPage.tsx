"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import SocialBotsWrapper from "../widgets/SocialBotsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ISocialBotsTrashedPageProps {}

const SocialBotsTrashedPage: React.FC<ISocialBotsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialBotsWrapper trashed />
    </DashboardLayout>
  );
};

export default SocialBotsTrashedPage;
