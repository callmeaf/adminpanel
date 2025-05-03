import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import AccountStrategyInfoForm from "./AccountStrategyInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeAccountStrategy,
  updateAccountStrategy,
} from "../requests/account-strategy-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toAccountStrategy, { IAccountStrategyModel } from "@/modules/AccountStrategy/models/AccountStrategy";
import moduleConfig from "../module.config";

interface IAccountStrategyFormsProps {
  accountStrategyModel?: IAccountStrategyModel;
}

const AccountStrategyForms: React.FC<IAccountStrategyFormsProps> = ({ accountStrategyModel }) => {
  const t = useTranslations("AccountStrategy.Widgets.Form");

  const [accountStrategy, setAccountStrategy] = React.useState<IAccountStrategyModel | undefined>(accountStrategyModel);
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
      id: "account_strategy_info",
      label: t("account_strategy_info_label"),
    },
  ]);

  const { handle: handleStoreAccountStrategy, loading: loadingStoreAccountStrategy } = useHttp(
    moduleConfig,
    storeAccountStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeAccountStrategy.success_message"),
          },
        });
        handleNextStep();
        setAccountStrategy(toAccountStrategy(res.data));
      },
    }
  );

  const { handle: handleUpdateAccountStrategy, loading: loadingUpdateAccountStrategy } = useHttp(
    moduleConfig,
    updateAccountStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategy.success_message"),
          },
        });
        handleNextStep();
        setAccountStrategy(toAccountStrategy(res.data));
      },
    }
  );

  const storeAccountStrategyHandler = (data: any) => handleStoreAccountStrategy(data);
  const updateAccountStrategyHandler = (data: any) =>
    handleUpdateAccountStrategy(data, { accountStrategyId: accountStrategy?.id! });

 const resetStepHandler = () => {
    if (accountStrategyModel) {
      handleGoToRoute("account_strategies_create");
    } else {
      handleResetStep();
      setAccountStrategy(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("account_strategies_index");
  };

  const goToEditRouteHandler = () => {
    if (accountStrategyModel) {
      handleResetStep();
    } else if (accountStrategy) {
      handleGoToRoute("account_strategies_edit", {
        accountStrategyId: accountStrategy.id,
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
      clickableStep={!!accountStrategy}
    >
      <AccountStrategyInfoForm
        loading={accountStrategy ? loadingUpdateAccountStrategy : loadingStoreAccountStrategy}
        onSubmit={accountStrategy ? updateAccountStrategyHandler : storeAccountStrategyHandler}
        accountStrategy={accountStrategy}
      />
    </Stepper>
  );
};

export default AccountStrategyForms;
