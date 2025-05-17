import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import MediaInfoForm from "./MediaInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeMedia,
  updateMedia,
} from "../requests/media-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toMedia, { IMediaModel } from "@/modules/Media/models/Media";
import moduleConfig from "../module.config";

interface IMediaFormsProps {
  mediaModel?: IMediaModel;
}

const MediaForms: React.FC<IMediaFormsProps> = ({ mediaModel }) => {
  const t = useTranslations("Media.Widgets.Form");

  const [media, setMedia] = React.useState<IMediaModel | undefined>(mediaModel);
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
      id: "media_info",
      label: t("media_info_label"),
    },
  ]);

  const { handle: handleStoreMedia, loading: loadingStoreMedia } = useHttp(
    moduleConfig,
    storeMedia,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeMedia.success_message"),
          },
        });
        handleNextStep();
        setMedia(toMedia(res.data));
      },
    }
  );

  const { handle: handleUpdateMedia, loading: loadingUpdateMedia } = useHttp(
    moduleConfig,
    updateMedia,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateMedia.success_message"),
          },
        });
        handleNextStep();
        setMedia(toMedia(res.data));
      },
    }
  );

  const storeMediaHandler = (data: any) => handleStoreMedia(data);
  const updateMediaHandler = (data: any) =>
    handleUpdateMedia(data, { mediaId: media?.id! });

 const resetStepHandler = () => {
    if (mediaModel) {
      handleGoToRoute("media_create");
    } else {
      handleResetStep();
      setMedia(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("media_index");
  };

  const goToEditRouteHandler = () => {
    if (mediaModel) {
      handleResetStep();
    } else if (media) {
      handleGoToRoute("media_edit", {
        mediaId: media.id,
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
      clickableStep={!!media}
    >
      <MediaInfoForm
        loading={media ? loadingUpdateMedia : loadingStoreMedia}
        onSubmit={media ? updateMediaHandler : storeMediaHandler}
        media={media}
      />
    </Stepper>
  );
};

export default MediaForms;
