"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import CommentsWrapper from "../widgets/CommentsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ICommentsPageProps {}

const CommentsPage: React.FC<ICommentsPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <CommentsWrapper />
    </DashboardLayout>
  );
};

export default CommentsPage;
