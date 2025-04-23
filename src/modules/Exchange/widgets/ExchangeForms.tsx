import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import ExchangeInfoForm from "./ExchangeInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import { storeExchange, updateExchange } from "../requests/exchange-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toExchange, { IExchangeModel } from "@/modules/Exchange/models/Exchange";
import moduleConfig from "../module.config";

interface IExchangeFormsProps {
  exchangeModel?: IExchangeModel;
}

const ExchangeForms: React.FC<IExchangeFormsProps> = ({ exchangeModel }) => {
  const t = useTranslations("Exchange.Widgets.Form");

  const [exchange, setExchange] = React.useState<IExchangeModel | undefined>(
    exchangeModel
  );
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
      id: "exchange_info",
      label: t("exchange_info_label"),
    },
  ]);

  const { handle: handleStoreExchange, loading: loadingStoreExchange } =
    useHttp(moduleConfig, storeExchange, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeExchange.success_message"),
          },
        });
        handleNextStep();
        setExchange(toExchange(res.data));
      },
    });

  const { handle: handleUpdateExchange, loading: loadingUpdateExchange } =
    useHttp(moduleConfig, updateExchange, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateExchange.success_message"),
          },
        });
        handleNextStep();
        setExchange(toExchange(res.data));
      },
    });

  const storeExchangeHandler = (data: any) => handleStoreExchange(data);
  const updateExchangeHandler = (data: any) =>
    handleUpdateExchange(data, { exchangeId: exchange?.id! });

  const resetStepHandler = () => {
    if (exchangeModel) {
      handleGoToRoute("exchanges_create");
    } else {
      handleResetStep();
      setExchange(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("exchanges_index");
  };

  const goToEditRouteHandler = () => {
    if (exchangeModel) {
      handleResetStep();
    } else if (exchange) {
      handleGoToRoute("exchanges_edit", {
        exchangeId: exchange.id,
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
      clickableStep={!!exchange}
    >
      <ExchangeInfoForm
        loading={exchange ? loadingUpdateExchange : loadingStoreExchange}
        onSubmit={exchange ? updateExchangeHandler : storeExchangeHandler}
        exchange={exchange}
      />
    </Stepper>
  );
};

export default ExchangeForms;
