import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import UserInfoForm from "./UserInfoForm";
import { useTranslations } from "next-intl";
import UserPasswordForm from "./UserPasswordForm";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeUser,
  syncUserRoles,
  updateUser,
  updateUserPassword,
} from "../requests/user-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toUser, { IUserModel } from "@/modules/User/models/User";
import moduleConfig from "../module.config";
import UserRolesForm from "./UserRolesForm";

interface IUsersFormProps {
  userModel?: IUserModel;
}

const UsersForm: React.FC<IUsersFormProps> = ({ userModel }) => {
  const t = useTranslations("User.Widgets.Form");

  const [user, setUser] = React.useState<IUserModel | undefined>(userModel);
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
      id: "user_info",
      label: t("user_info_label"),
    },
    {
      id: "user_password",
      label: t("user_password_label"),
    },
    {
      id: "roles",
      label: t("roles_label"),
      optional: true,
    },
  ]);

  const { handle: handleStoreUser, loading: loadingStoreUser } = useHttp(
    moduleConfig,
    storeUser,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeUser.success_message"),
          },
        });
        handleNextStep();
        setUser(toUser(res.data));
      },
    }
  );

  const { handle: handleUpdateUser, loading: loadingUpdateUser } = useHttp(
    moduleConfig,
    updateUser,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateUser.success_message"),
          },
        });
        handleNextStep();
        setUser(toUser(res.data));
      },
    }
  );

  const {
    handle: handleUpdateUserPassword,
    loading: loadingUpdateUserPassword,
  } = useHttp(moduleConfig, updateUserPassword, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("updateUserPassword.success_message"),
        },
      });
      handleNextStep();
    },
  });

  const { handle: handleSyncUserRoles, loading: loadingSyncUserRoles } =
    useHttp(moduleConfig, syncUserRoles, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("syncUserRoles.success_message"),
          },
        });
        handleNextStep();
        setUser(toUser(res.data));
      },
    });

  const storeUserHandler = (data: any) => handleStoreUser(data);
  const updateUserHandler = (data: any) =>
    handleUpdateUser(data, { userId: user?.email! });
  const updateUserPasswordHandler = (data: any) =>
    handleUpdateUserPassword(data, { userId: user?.email! });
  const syncUserRolesHandler = (data: any) =>
    handleSyncUserRoles(data, { userId: user?.email! });

  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      activeStepIndex={activeStepIndex}
      completed={completed}
      handleNextStep={handleNextStep}
      handleBackStep={handleBackStep}
      handleResetStep={handleResetStep}
      handleGoToList={handleGoToRoute.bind(null, "users_index")}
      handleGoToEdit={
        user
          ? handleGoToRoute.bind(null, "users_edit", {
              userId: user.id,
            })
          : undefined
      }
      handleGoStep={handleGoStep}
      clickableStep={!!user}
    >
      <UserInfoForm
        loading={user ? loadingUpdateUser : loadingStoreUser}
        onSubmit={user ? updateUserHandler : storeUserHandler}
        user={user}
      />
      <UserPasswordForm
        loading={loadingUpdateUserPassword}
        onSubmit={updateUserPasswordHandler}
      />
      <UserRolesForm
        loading={loadingSyncUserRoles}
        onSubmit={syncUserRolesHandler}
        user={user}
      />
    </Stepper>
  );
};

export default UsersForm;
