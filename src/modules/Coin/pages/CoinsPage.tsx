"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import CoinsWrapper from "../widgets/CoinsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ICoinsPageProps {}

const CoinsPage: React.FC<ICoinsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <CoinsWrapper />
    </DashboardLayout>
  );
};

export default CoinsPage;
