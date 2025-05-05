import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import VersionInfoForm from "./VersionInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeVersion,
  updateVersion,
} from "../requests/version-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toVersion, { IVersionModel } from "@/modules/Version/models/Version";
import moduleConfig from "../module.config";

interface IVersionFormsProps {
  versionModel?: IVersionModel;
}

const VersionForms: React.FC<IVersionFormsProps> = ({ versionModel }) => {
  const t = useTranslations("Version.Widgets.Form");

  const [version, setVersion] = React.useState<IVersionModel | undefined>(versionModel);
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
      id: "version_info",
      label: t("version_info_label"),
    },
  ]);

  const { handle: handleStoreVersion, loading: loadingStoreVersion } = useHttp(
    moduleConfig,
    storeVersion,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeVersion.success_message"),
          },
        });
        handleNextStep();
        setVersion(toVersion(res.data));
      },
    }
  );

  const { handle: handleUpdateVersion, loading: loadingUpdateVersion } = useHttp(
    moduleConfig,
    updateVersion,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateVersion.success_message"),
          },
        });
        handleNextStep();
        setVersion(toVersion(res.data));
      },
    }
  );

  const storeVersionHandler = (data: any) => handleStoreVersion(data);
  const updateVersionHandler = (data: any) =>
    handleUpdateVersion(data, { versionId: version?.id! });

 const resetStepHandler = () => {
    if (versionModel) {
      handleGoToRoute("versions_create");
    } else {
      handleResetStep();
      setVersion(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("versions_index");
  };

  const goToEditRouteHandler = () => {
    if (versionModel) {
      handleResetStep();
    } else if (version) {
      handleGoToRoute("versions_edit", {
        versionId: version.id,
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
      clickableStep={!!version}
    >
      <VersionInfoForm
        loading={version ? loadingUpdateVersion : loadingStoreVersion}
        onSubmit={version ? updateVersionHandler : storeVersionHandler}
        version={version}
      />
    </Stepper>
  );
};

export default VersionForms;
