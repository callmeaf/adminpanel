import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import TicketReplyInfoForm from "./TicketReplyInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  storeTicketReply,
  updateTicketReply,
} from "../requests/ticket-reply-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toTicketReply, { ITicketReplyModel } from "@/modules/TicketReply/models/TicketReply";
import moduleConfig from "../module.config";

interface ITicketReplyFormsProps {
  ticketReplyModel?: ITicketReplyModel;
}

const TicketReplyForms: React.FC<ITicketReplyFormsProps> = ({ ticketReplyModel }) => {
  const t = useTranslations("TicketReply.Widgets.Form");

  const [ticketReply, setTicketReply] = React.useState<ITicketReplyModel | undefined>(ticketReplyModel);
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
      id: "ticket_reply_info",
      label: t("ticket_reply_info_label"),
    },
  ]);

  const { handle: handleStoreTicketReply, loading: loadingStoreTicketReply } = useHttp(
    moduleConfig,
    storeTicketReply,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeTicketReply.success_message"),
          },
        });
        handleNextStep();
        setTicketReply(toTicketReply(res.data));
      },
    }
  );

  const { handle: handleUpdateTicketReply, loading: loadingUpdateTicketReply } = useHttp(
    moduleConfig,
    updateTicketReply,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicketReply.success_message"),
          },
        });
        handleNextStep();
        setTicketReply(toTicketReply(res.data));
      },
    }
  );

  const storeTicketReplyHandler = (data: any) => handleStoreTicketReply(data);
  const updateTicketReplyHandler = (data: any) =>
    handleUpdateTicketReply(data, { ticketReplyId: ticketReply?.id! });

 const resetStepHandler = () => {
    if (ticketReplyModel) {
      handleGoToRoute("ticket_replies_create");
    } else {
      handleResetStep();
      setTicketReply(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("ticket_replies_index");
  };

  const goToEditRouteHandler = () => {
    if (ticketReplyModel) {
      handleResetStep();
    } else if (ticketReply) {
      handleGoToRoute("ticket_replies_edit", {
        ticketReplyId: ticketReply.id,
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
      clickableStep={!!ticketReply}
    >
      <TicketReplyInfoForm
        loading={ticketReply ? loadingUpdateTicketReply : loadingStoreTicketReply}
        onSubmit={ticketReply ? updateTicketReplyHandler : storeTicketReplyHandler}
        ticketReply={ticketReply}
      />
    </Stepper>
  );
};

export default TicketReplyForms;
