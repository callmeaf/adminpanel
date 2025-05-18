import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import LogInfoForm from "./LogInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeLog,
  updateLog,
} from "../requests/log-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toLog, { ILogModel } from "@/modules/Log/models/Log";
import moduleConfig from "../module.config";

interface ILogFormsProps {
  logModel?: ILogModel;
}

const LogForms: React.FC<ILogFormsProps> = ({ logModel }) => {
  const t = useTranslations("Log.Widgets.Form");

  const [log, setLog] = React.useState<ILogModel | undefined>(logModel);
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
      id: "log_info",
      label: t("log_info_label"),
    },
  ]);

  const { handle: handleStoreLog, loading: loadingStoreLog } = useHttp(
    moduleConfig,
    storeLog,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeLog.success_message"),
          },
        });
        handleNextStep();
        setLog(toLog(res.data));
      },
    }
  );

  const { handle: handleUpdateLog, loading: loadingUpdateLog } = useHttp(
    moduleConfig,
    updateLog,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateLog.success_message"),
          },
        });
        handleNextStep();
        setLog(toLog(res.data));
      },
    }
  );

  const storeLogHandler = (data: any) => handleStoreLog(data);
  const updateLogHandler = (data: any) =>
    handleUpdateLog(data, { logId: log?.id! });

 const resetStepHandler = () => {
    if (logModel) {
      handleGoToRoute("logs_create");
    } else {
      handleResetStep();
      setLog(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("logs_index");
  };

  const goToEditRouteHandler = () => {
    if (logModel) {
      handleResetStep();
    } else if (log) {
      handleGoToRoute("logs_edit", {
        logId: log.id,
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
      clickableStep={!!log}
    >
      <LogInfoForm
        loading={log ? loadingUpdateLog : loadingStoreLog}
        onSubmit={log ? updateLogHandler : storeLogHandler}
        log={log}
      />
    </Stepper>
  );
};

export default LogForms;
