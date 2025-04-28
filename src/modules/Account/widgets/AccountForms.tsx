import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import AccountInfoForm from "./AccountInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeAccount,
  updateAccount,
} from "../requests/account-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toAccount, { IAccountModel } from "@/modules/Account/models/Account";
import moduleConfig from "../module.config";

interface IAccountFormsProps {
  accountModel?: IAccountModel;
}

const AccountForms: React.FC<IAccountFormsProps> = ({ accountModel }) => {
  const t = useTranslations("Account.Widgets.Form");

  const [account, setAccount] = React.useState<IAccountModel | undefined>(accountModel);
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
      id: "account_info",
      label: t("account_info_label"),
    },
  ]);

  const { handle: handleStoreAccount, loading: loadingStoreAccount } = useHttp(
    moduleConfig,
    storeAccount,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeAccount.success_message"),
          },
        });
        handleNextStep();
        setAccount(toAccount(res.data));
      },
    }
  );

  const { handle: handleUpdateAccount, loading: loadingUpdateAccount } = useHttp(
    moduleConfig,
    updateAccount,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccount.success_message"),
          },
        });
        handleNextStep();
        setAccount(toAccount(res.data));
      },
    }
  );

  const storeAccountHandler = (data: any) => handleStoreAccount(data);
  const updateAccountHandler = (data: any) =>
    handleUpdateAccount(data, { accountId: account?.id! });

 const resetStepHandler = () => {
    if (accountModel) {
      handleGoToRoute("accounts_create");
    } else {
      handleResetStep();
      setAccount(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("accounts_index");
  };

  const goToEditRouteHandler = () => {
    if (accountModel) {
      handleResetStep();
    } else if (account) {
      handleGoToRoute("accounts_edit", {
        accountId: account.id,
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
      clickableStep={!!account}
    >
      <AccountInfoForm
        loading={account ? loadingUpdateAccount : loadingStoreAccount}
        onSubmit={account ? updateAccountHandler : storeAccountHandler}
        account={account}
      />
    </Stepper>
  );
};

export default AccountForms;
