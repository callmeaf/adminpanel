import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import AccountStrategyCoinInfoForm from "./AccountStrategyCoinInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeAccountStrategyCoin,
  updateAccountStrategyCoin,
} from "../requests/account-strategy-coin-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toAccountStrategyCoin, { IAccountStrategyCoinModel } from "@/modules/AccountStrategyCoin/models/AccountStrategyCoin";
import moduleConfig from "../module.config";

interface IAccountStrategyCoinFormsProps {
  accountStrategyCoinModel?: IAccountStrategyCoinModel;
}

const AccountStrategyCoinForms: React.FC<IAccountStrategyCoinFormsProps> = ({ accountStrategyCoinModel }) => {
  const t = useTranslations("AccountStrategyCoin.Widgets.Form");

  const [accountStrategyCoin, setAccountStrategyCoin] = React.useState<IAccountStrategyCoinModel | undefined>(accountStrategyCoinModel);
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
      id: "account_strategy_coin_info",
      label: t("account_strategy_coin_info_label"),
    },
  ]);

  const { handle: handleStoreAccountStrategyCoin, loading: loadingStoreAccountStrategyCoin } = useHttp(
    moduleConfig,
    storeAccountStrategyCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeAccountStrategyCoin.success_message"),
          },
        });
        handleNextStep();
        setAccountStrategyCoin(toAccountStrategyCoin(res.data));
      },
    }
  );

  const { handle: handleUpdateAccountStrategyCoin, loading: loadingUpdateAccountStrategyCoin } = useHttp(
    moduleConfig,
    updateAccountStrategyCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategyCoin.success_message"),
          },
        });
        handleNextStep();
        setAccountStrategyCoin(toAccountStrategyCoin(res.data));
      },
    }
  );

  const storeAccountStrategyCoinHandler = (data: any) => handleStoreAccountStrategyCoin(data);
  const updateAccountStrategyCoinHandler = (data: any) =>
    handleUpdateAccountStrategyCoin(data, { accountStrategyCoinId: accountStrategyCoin?.id! });

 const resetStepHandler = () => {
    if (accountStrategyCoinModel) {
      handleGoToRoute("account_strategy_coins_create");
    } else {
      handleResetStep();
      setAccountStrategyCoin(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("account_strategy_coins_index");
  };

  const goToEditRouteHandler = () => {
    if (accountStrategyCoinModel) {
      handleResetStep();
    } else if (accountStrategyCoin) {
      handleGoToRoute("account_strategy_coins_edit", {
        accountStrategyCoinId: accountStrategyCoin.id,
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
      clickableStep={!!accountStrategyCoin}
    >
      <AccountStrategyCoinInfoForm
        loading={accountStrategyCoin ? loadingUpdateAccountStrategyCoin : loadingStoreAccountStrategyCoin}
        onSubmit={accountStrategyCoin ? updateAccountStrategyCoinHandler : storeAccountStrategyCoinHandler}
        accountStrategyCoin={accountStrategyCoin}
      />
    </Stepper>
  );
};

export default AccountStrategyCoinForms;
