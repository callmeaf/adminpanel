"use client";

import CommentForms from "../widgets/CommentForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toComment, { ICommentModel } from "../models/Comment";
import useHttp from "@/modules/Base/hooks/use-http";
import { getCommentByKey } from "../requests/comment-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ICommentEditPageProps {}

const CommentEditPage: React.FC<ICommentEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [comment, setComment] = React.useState<ICommentModel | undefined>(undefined);

  const { handle: handleGetCommentByKey, loading: loadingGetCommentByKey } = useHttp(
    moduleConfig,
    getCommentByKey,
    {
      onSuccess: (res) => {
        setComment(toComment(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetCommentByKey(
      {},
      {
        key: params.commentId,
      }
    );
  }, [params.commentId]);

  return (
    <DashboardLayout>
      <Show when={!!comment}>
        <Show.When>
          <CommentForms commentModel={comment} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetCommentByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default CommentEditPage;
