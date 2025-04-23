import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import CoinInfoForm from "./CoinInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import { storeCoin, updateCoin } from "../requests/coin-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toCoin, { ICoinModel } from "@/modules/Coin/models/Coin";
import moduleConfig from "../module.config";

interface ICoinFormsProps {
  coinModel?: ICoinModel;
}

const CoinForms: React.FC<ICoinFormsProps> = ({ coinModel }) => {
  const t = useTranslations("Coin.Widgets.Form");

  const [coin, setCoin] = React.useState<ICoinModel | undefined>(coinModel);
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
      id: "coin_info",
      label: t("coin_info_label"),
    },
  ]);

  const { handle: handleStoreCoin, loading: loadingStoreCoin } = useHttp(
    moduleConfig,
    storeCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeCoin.success_message"),
          },
        });
        handleNextStep();
        setCoin(toCoin(res.data));
      },
    }
  );

  const { handle: handleUpdateCoin, loading: loadingUpdateCoin } = useHttp(
    moduleConfig,
    updateCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateCoin.success_message"),
          },
        });
        handleNextStep();
        setCoin(toCoin(res.data));
      },
    }
  );

  const storeCoinHandler = (data: any) => handleStoreCoin(data);
  const updateCoinHandler = (data: any) =>
    handleUpdateCoin(data, { coinId: coin?.id! });

  const resetStepHandler = () => {
    if (coinModel) {
      handleGoToRoute("coins_create");
    } else {
      handleResetStep();
      setCoin(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("coins_index");
  };

  const goToEditRouteHandler = () => {
    if (coinModel) {
      handleResetStep();
    } else if (coin) {
      handleGoToRoute("coins_edit", {
        coinId: coin.id,
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
      clickableStep={!!coin}
    >
      <CoinInfoForm
        loading={coin ? loadingUpdateCoin : loadingStoreCoin}
        onSubmit={coin ? updateCoinHandler : storeCoinHandler}
        coin={coin}
      />
    </Stepper>
  );
};

export default CoinForms;
