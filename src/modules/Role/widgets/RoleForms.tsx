import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import RoleInfoForm from "./RoleInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeRole,
  syncRolePermissions,
  updateRole,
} from "../requests/role-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toRole, { IRoleModel } from "@/modules/Role/models/Role";
import moduleConfig from "../module.config";
import RolePermissionsForm from "./RolePermissionsForm";

interface IRoleFormsProps {
  roleModel?: IRoleModel;
}

const RoleForms: React.FC<IRoleFormsProps> = ({ roleModel }) => {
  const t = useTranslations("Role.Widgets.Form");

  const [role, setRole] = React.useState<IRoleModel | undefined>(roleModel);
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
      id: "role_info",
      label: t("role_info_label"),
    },
    {
      id: "permissions_info",
      label: t("role_permissions_label"),
      optional: true,
    },
  ]);

  const { handle: handleStoreRole, loading: loadingStoreRole } = useHttp(
    moduleConfig,
    storeRole,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeRole.success_message"),
          },
        });
        handleNextStep();
        setRole(toRole(res.data));
      },
    }
  );

  const { handle: handleUpdateRole, loading: loadingUpdateRole } = useHttp(
    moduleConfig,
    updateRole,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateRole.success_message"),
          },
        });
        handleNextStep();
        setRole(toRole(res.data));
      },
    }
  );

  const {
    handle: handleSyncRolePermissions,
    loading: loadingSyncRolePermissions,
  } = useHttp(moduleConfig, syncRolePermissions, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("syncRolePermissions.success_message"),
        },
      });
      handleNextStep();
      setRole(toRole(res.data));
    },
  });

  const storeRoleHandler = (data: any) => handleStoreRole(data);
  const updateRoleHandler = (data: any) =>
    handleUpdateRole(data, { roleId: role?.id! });
  const syncRolePermissionsHandler = (data: any) =>
    handleSyncRolePermissions(data, { roleId: role?.id! });

  const resetStepHandler = () => {
    if (roleModel) {
      handleGoToRoute("roles_create");
    } else {
      handleResetStep();
      setRole(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("roles_index");
  };

  const goToEditRouteHandler = () => {
    if (roleModel) {
      handleResetStep();
    } else if (role) {
      handleGoToRoute("roles_edit", {
        roleId: role.id,
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
      clickableStep={!!role}
    >
      <RoleInfoForm
        loading={role ? loadingUpdateRole : loadingStoreRole}
        onSubmit={role ? updateRoleHandler : storeRoleHandler}
        role={role}
      />
      <RolePermissionsForm
        loading={loadingSyncRolePermissions}
        onSubmit={syncRolePermissionsHandler}
        role={role}
      />
    </Stepper>
  );
};

export default RoleForms;
