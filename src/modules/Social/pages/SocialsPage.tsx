"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import SocialsWrapper from "../widgets/SocialsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ISocialsPageProps {}

const SocialsPage: React.FC<ISocialsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <SocialsWrapper />
    </DashboardLayout>
  );
};

export default SocialsPage;
