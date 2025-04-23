import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import SettingInfoForm from "./SettingInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeSetting,
  updateSetting,
} from "../requests/setting-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toSetting, { ISettingModel } from "@/modules/Setting/models/Setting";
import moduleConfig from "../module.config";

interface ISettingFormsProps {
  settingModel?: ISettingModel;
}

const SettingForms: React.FC<ISettingFormsProps> = ({ settingModel }) => {
  const t = useTranslations("Setting.Widgets.Form");

  const [setting, setSetting] = React.useState<ISettingModel | undefined>(settingModel);
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
      id: "setting_info",
      label: t("setting_info_label"),
    },
  ]);

  const { handle: handleStoreSetting, loading: loadingStoreSetting } = useHttp(
    moduleConfig,
    storeSetting,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeSetting.success_message"),
          },
        });
        handleNextStep();
        setSetting(toSetting(res.data));
      },
    }
  );

  const { handle: handleUpdateSetting, loading: loadingUpdateSetting } = useHttp(
    moduleConfig,
    updateSetting,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSetting.success_message"),
          },
        });
        handleNextStep();
        setSetting(toSetting(res.data));
      },
    }
  );

  const storeSettingHandler = (data: any) => handleStoreSetting(data);
  const updateSettingHandler = (data: any) =>
    handleUpdateSetting(data, { settingId: setting?.id! });

 const resetStepHandler = () => {
    if (settingModel) {
      handleGoToRoute("settings_create");
    } else {
      handleResetStep();
      setSetting(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("settings_index");
  };

  const goToEditRouteHandler = () => {
    if (settingModel) {
      handleResetStep();
    } else if (setting) {
      handleGoToRoute("settings_edit", {
        settingId: setting.id,
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
      clickableStep={!!setting}
    >
      <SettingInfoForm
        loading={setting ? loadingUpdateSetting : loadingStoreSetting}
        onSubmit={setting ? updateSettingHandler : storeSettingHandler}
        setting={setting}
      />
    </Stepper>
  );
};

export default SettingForms;
