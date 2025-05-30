import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import PermissionInfoForm from "./PermissionInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storePermission,
  updatePermission,
} from "../requests/permission-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toPermission, { IPermissionModel } from "@/modules/Permission/models/Permission";
import moduleConfig from "../module.config";

interface IPermissionFormsProps {
  permissionModel?: IPermissionModel;
}

const PermissionForms: React.FC<IPermissionFormsProps> = ({ permissionModel }) => {
  const t = useTranslations("Permission.Widgets.Form");

  const [permission, setPermission] = React.useState<IPermissionModel | undefined>(permissionModel);
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
      id: "permission_info",
      label: t("permission_info_label"),
    },
  ]);

  const { handle: handleStorePermission, loading: loadingStorePermission } = useHttp(
    moduleConfig,
    storePermission,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storePermission.success_message"),
          },
        });
        handleNextStep();
        setPermission(toPermission(res.data));
      },
    }
  );

  const { handle: handleUpdatePermission, loading: loadingUpdatePermission } = useHttp(
    moduleConfig,
    updatePermission,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updatePermission.success_message"),
          },
        });
        handleNextStep();
        setPermission(toPermission(res.data));
      },
    }
  );

  const storePermissionHandler = (data: any) => handleStorePermission(data);
  const updatePermissionHandler = (data: any) =>
    handleUpdatePermission(data, { permissionId: permission?.id! });

 const resetStepHandler = () => {
    if (permissionModel) {
      handleGoToRoute("permissions_create");
    } else {
      handleResetStep();
      setPermission(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("permissions_index");
  };

  const goToEditRouteHandler = () => {
    if (permissionModel) {
      handleResetStep();
    } else if (permission) {
      handleGoToRoute("permissions_edit", {
        permissionId: permission.id,
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
      clickableStep={!!permission}
    >
      <PermissionInfoForm
        loading={permission ? loadingUpdatePermission : loadingStorePermission}
        onSubmit={permission ? updatePermissionHandler : storePermissionHandler}
        permission={permission}
      />
    </Stepper>
  );
};

export default PermissionForms;
