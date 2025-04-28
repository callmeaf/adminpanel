import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import StrategyInfoForm from "./StrategyInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeStrategy,
  updateStrategy,
} from "../requests/strategy-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toStrategy, { IStrategyModel } from "@/modules/Strategy/models/Strategy";
import moduleConfig from "../module.config";

interface IStrategyFormsProps {
  strategyModel?: IStrategyModel;
}

const StrategyForms: React.FC<IStrategyFormsProps> = ({ strategyModel }) => {
  const t = useTranslations("Strategy.Widgets.Form");

  const [strategy, setStrategy] = React.useState<IStrategyModel | undefined>(strategyModel);
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
      id: "strategy_info",
      label: t("strategy_info_label"),
    },
  ]);

  const { handle: handleStoreStrategy, loading: loadingStoreStrategy } = useHttp(
    moduleConfig,
    storeStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeStrategy.success_message"),
          },
        });
        handleNextStep();
        setStrategy(toStrategy(res.data));
      },
    }
  );

  const { handle: handleUpdateStrategy, loading: loadingUpdateStrategy } = useHttp(
    moduleConfig,
    updateStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateStrategy.success_message"),
          },
        });
        handleNextStep();
        setStrategy(toStrategy(res.data));
      },
    }
  );

  const storeStrategyHandler = (data: any) => handleStoreStrategy(data);
  const updateStrategyHandler = (data: any) =>
    handleUpdateStrategy(data, { strategyId: strategy?.id! });

 const resetStepHandler = () => {
    if (strategyModel) {
      handleGoToRoute("strategies_create");
    } else {
      handleResetStep();
      setStrategy(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("strategies_index");
  };

  const goToEditRouteHandler = () => {
    if (strategyModel) {
      handleResetStep();
    } else if (strategy) {
      handleGoToRoute("strategies_edit", {
        strategyId: strategy.id,
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
      clickableStep={!!strategy}
    >
      <StrategyInfoForm
        loading={strategy ? loadingUpdateStrategy : loadingStoreStrategy}
        onSubmit={strategy ? updateStrategyHandler : storeStrategyHandler}
        strategy={strategy}
      />
    </Stepper>
  );
};

export default StrategyForms;
