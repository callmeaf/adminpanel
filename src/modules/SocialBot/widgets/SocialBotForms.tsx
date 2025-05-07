import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import SocialBotInfoForm from "./SocialBotInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeSocialBot,
  updateSocialBot,
} from "../requests/social-bot-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toSocialBot, { ISocialBotModel } from "@/modules/SocialBot/models/SocialBot";
import moduleConfig from "../module.config";

interface ISocialBotFormsProps {
  socialBotModel?: ISocialBotModel;
}

const SocialBotForms: React.FC<ISocialBotFormsProps> = ({ socialBotModel }) => {
  const t = useTranslations("SocialBot.Widgets.Form");

  const [socialBot, setSocialBot] = React.useState<ISocialBotModel | undefined>(socialBotModel);
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
      id: "social_bot_info",
      label: t("social_bot_info_label"),
    },
  ]);

  const { handle: handleStoreSocialBot, loading: loadingStoreSocialBot } = useHttp(
    moduleConfig,
    storeSocialBot,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeSocialBot.success_message"),
          },
        });
        handleNextStep();
        setSocialBot(toSocialBot(res.data));
      },
    }
  );

  const { handle: handleUpdateSocialBot, loading: loadingUpdateSocialBot } = useHttp(
    moduleConfig,
    updateSocialBot,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocialBot.success_message"),
          },
        });
        handleNextStep();
        setSocialBot(toSocialBot(res.data));
      },
    }
  );

  const storeSocialBotHandler = (data: any) => handleStoreSocialBot(data);
  const updateSocialBotHandler = (data: any) =>
    handleUpdateSocialBot(data, { socialBotId: socialBot?.id! });

 const resetStepHandler = () => {
    if (socialBotModel) {
      handleGoToRoute("social_bots_create");
    } else {
      handleResetStep();
      setSocialBot(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("social_bots_index");
  };

  const goToEditRouteHandler = () => {
    if (socialBotModel) {
      handleResetStep();
    } else if (socialBot) {
      handleGoToRoute("social_bots_edit", {
        socialBotId: socialBot.id,
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
      clickableStep={!!socialBot}
    >
      <SocialBotInfoForm
        loading={socialBot ? loadingUpdateSocialBot : loadingStoreSocialBot}
        onSubmit={socialBot ? updateSocialBotHandler : storeSocialBotHandler}
        socialBot={socialBot}
      />
    </Stepper>
  );
};

export default SocialBotForms;
