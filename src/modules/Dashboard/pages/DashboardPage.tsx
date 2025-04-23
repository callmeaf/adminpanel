"use client";

import React from "react";
import DashboardLayout from "../widgets/DashboardLayout";
import DashboardWrapper from "../widgets/DashboardWrapper";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

const DashboardPage = () => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <DashboardWrapper />
    </DashboardLayout>
  );
};

export default DashboardPage;
