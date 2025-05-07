"use client";

import SocialBotForms from "../widgets/SocialBotForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ISocialBotCreatePageProps {}

const SocialBotCreatePage: React.FC<ISocialBotCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialBotForms />
    </DashboardLayout>
  );
};

export default SocialBotCreatePage;
