import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import SocialInfoForm from "./SocialInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeSocial,
  updateSocial,
} from "../requests/social-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toSocial, { ISocialModel } from "@/modules/Social/models/Social";
import moduleConfig from "../module.config";

interface ISocialFormsProps {
  socialModel?: ISocialModel;
}

const SocialForms: React.FC<ISocialFormsProps> = ({ socialModel }) => {
  const t = useTranslations("Social.Widgets.Form");

  const [social, setSocial] = React.useState<ISocialModel | undefined>(socialModel);
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
      id: "social_info",
      label: t("social_info_label"),
    },
  ]);

  const { handle: handleStoreSocial, loading: loadingStoreSocial } = useHttp(
    moduleConfig,
    storeSocial,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeSocial.success_message"),
          },
        });
        handleNextStep();
        setSocial(toSocial(res.data));
      },
    }
  );

  const { handle: handleUpdateSocial, loading: loadingUpdateSocial } = useHttp(
    moduleConfig,
    updateSocial,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocial.success_message"),
          },
        });
        handleNextStep();
        setSocial(toSocial(res.data));
      },
    }
  );

  const storeSocialHandler = (data: any) => handleStoreSocial(data);
  const updateSocialHandler = (data: any) =>
    handleUpdateSocial(data, { socialId: social?.id! });

 const resetStepHandler = () => {
    if (socialModel) {
      handleGoToRoute("socials_create");
    } else {
      handleResetStep();
      setSocial(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("socials_index");
  };

  const goToEditRouteHandler = () => {
    if (socialModel) {
      handleResetStep();
    } else if (social) {
      handleGoToRoute("socials_edit", {
        socialId: social.id,
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
      clickableStep={!!social}
    >
      <SocialInfoForm
        loading={social ? loadingUpdateSocial : loadingStoreSocial}
        onSubmit={social ? updateSocialHandler : storeSocialHandler}
        social={social}
      />
    </Stepper>
  );
};

export default SocialForms;
