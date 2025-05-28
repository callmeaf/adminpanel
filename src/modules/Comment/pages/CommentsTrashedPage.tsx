"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import CommentsWrapper from "../widgets/CommentsWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface ICommentsTrashedPageProps {}

const CommentsTrashedPage: React.FC<ICommentsTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <CommentsWrapper trashed />
    </DashboardLayout>
  );
};

export default CommentsTrashedPage;
