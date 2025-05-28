import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import CommentInfoForm from "./CommentInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeComment,
  updateComment,
} from "../requests/comment-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toComment, { ICommentModel } from "@/modules/Comment/models/Comment";
import moduleConfig from "../module.config";

interface ICommentFormsProps {
  commentModel?: ICommentModel;
}

const CommentForms: React.FC<ICommentFormsProps> = ({ commentModel }) => {
  const t = useTranslations("Comment.Widgets.Form");

  const [comment, setComment] = React.useState<ICommentModel | undefined>(commentModel);
  const {
    steps,
    activeStep,
    activeStepIndex,
    completed,
    handleNextStep,
    handleBackStep,
    handleResetStep,
    handleGoToRoute,
    handleGoStep,
  } = useStepper([
    {
      id: "comment_info",
      label: t("comment_info_label"),
    },
  ]);

  const { handle: handleStoreComment, loading: loadingStoreComment } = useHttp(
    moduleConfig,
    storeComment,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeComment.success_message"),
          },
        });
        handleNextStep();
        setComment(toComment(res.data));
      },
    }
  );

  const { handle: handleUpdateComment, loading: loadingUpdateComment } = useHttp(
    moduleConfig,
    updateComment,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateComment.success_message"),
          },
        });
        handleNextStep();
        setComment(toComment(res.data));
      },
    }
  );

  const storeCommentHandler = (data: any) => handleStoreComment(data);
  const updateCommentHandler = (data: any) =>
    handleUpdateComment(data, { commentId: comment?.id! });

 const resetStepHandler = () => {
    if (commentModel) {
      handleGoToRoute("comments_create");
    } else {
      handleResetStep();
      setComment(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("comments_index");
  };

  const goToEditRouteHandler = () => {
    if (commentModel) {
      handleResetStep();
    } else if (comment) {
      handleGoToRoute("comments_edit", {
        commentId: comment.id,
      });
    }
  };

  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      activeStepIndex={activeStepIndex}
      completed={completed}
      handleNextStep={handleNextStep}
      handleBackStep={handleBackStep}
      handleResetStep={resetStepHandler}
      handleGoToList={goToListRouteHandler}
      handleGoToEdit={goToEditRouteHandler}
      handleGoStep={handleGoStep}
      clickableStep={!!comment}
    >
      <CommentInfoForm
        loading={comment ? loadingUpdateComment : loadingStoreComment}
        onSubmit={comment ? updateCommentHandler : storeCommentHandler}
        comment={comment}
      />
    </Stepper>
  );
};

export default CommentForms;
