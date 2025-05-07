"use client";

import SocialForms from "../widgets/SocialForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ISocialCreatePageProps {}

const SocialCreatePage: React.FC<ISocialCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialForms />
    </DashboardLayout>
  );
};

export default SocialCreatePage;
