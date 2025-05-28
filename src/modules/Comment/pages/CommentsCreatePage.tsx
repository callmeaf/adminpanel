"use client";

import CommentForms from "../widgets/CommentForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface ICommentCreatePageProps {}

const CommentCreatePage: React.FC<ICommentCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <CommentForms />
    </DashboardLayout>
  );
};

export default CommentCreatePage;
