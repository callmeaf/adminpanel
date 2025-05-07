"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import SocialsWrapper from "../widgets/SocialsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ISocialsTrashedPageProps {}

const SocialsTrashedPage: React.FC<ISocialsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialsWrapper trashed />
    </DashboardLayout>
  );
};

export default SocialsTrashedPage;
