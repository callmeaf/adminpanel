import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import TicketInfoForm from "./TicketInfoForm";
import { useTranslations } from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import { storeTicket, updateTicket } from "../requests/ticket-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import toTicket, { ITicketModel } from "@/modules/Ticket/models/Ticket";
import moduleConfig from "../module.config";
import ticketReplyModuleConfig from "@/modules/TicketReply/module.config";
import { Box } from "@mui/material";
import TicketRepliesList from "@/modules/TicketReply/widgets/TicketRepliesList";
import TicketReplyInfoForm from "@/modules/TicketReply/widgets/TicketReplyInfoForm";
import { storeTicketReply } from "@/modules/TicketReply/requests/ticket-reply-requests";
import toTicketReply, {
  ITicketReplyModel,
} from "@/modules/TicketReply/models/TicketReply";

interface ITicketFormsProps {
  ticketModel?: ITicketModel;
}

const TicketForms: React.FC<ITicketFormsProps> = ({ ticketModel }) => {
  const t = useTranslations("Ticket.Widgets.Form");

  const [ticket, setTicket] = React.useState<ITicketModel | undefined>(
    ticketModel
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
      id: "ticket_info",
      label: t("ticket_info_label"),
    },
    {
      id: "ticket_replies_info",
      label: t("ticket_replies_info_label"),
      optional: true,
    },
  ]);

  const { handle: handleStoreTicket, loading: loadingStoreTicket } = useHttp(
    moduleConfig,
    storeTicket,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeTicket.success_message"),
          },
        });
        handleNextStep();
        setTicket(toTicket(res.data));
      },
    }
  );

  const { handle: handleUpdateTicket, loading: loadingUpdateTicket } = useHttp(
    moduleConfig,
    updateTicket,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicket.success_message"),
          },
        });
        handleNextStep();
        setTicket(toTicket(res.data));
      },
    }
  );

  const storeTicketHandler = (data: any) => handleStoreTicket(data);
  const updateTicketHandler = (data: any) =>
    handleUpdateTicket(data, { ticketId: ticket?.id! });

  const resetStepHandler = () => {
    if (ticketModel) {
      handleGoToRoute("tickets_create");
    } else {
      handleResetStep();
      setTicket(undefined);
    }
  };

  const goToListRouteHandler = () => {
    handleGoToRoute("tickets_index");
  };

  const goToEditRouteHandler = () => {
    if (ticketModel) {
      handleResetStep();
    } else if (ticket) {
      handleGoToRoute("tickets_edit", {
        ticketId: ticket.id,
      });
    }
  };

  const [replies, setReplies] = React.useState<ITicketReplyModel[]>(
    ticket?.replies ?? []
  );

  const { handle: handleStoreTicketReply, loading: loadingStoreTicketReply } =
    useHttp(ticketReplyModuleConfig, storeTicketReply, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("storeTicketReply.success_message"),
          },
        });
        handleNextStep();
        setReplies((prev) => [...prev, toTicketReply(res.data)]);
      },
    });
  const storeTicketReplyHandler = (data: any) =>
    handleStoreTicketReply({
      ...data,
      ticket_ref_code: ticket?.id,
    });
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
      clickableStep={!!ticket}
    >
      <TicketInfoForm
        loading={ticket ? loadingUpdateTicket : loadingStoreTicket}
        onSubmit={ticket ? updateTicketHandler : storeTicketHandler}
        ticket={ticket}
      />
      <Box>
        {ticket && <TicketRepliesList ticket={ticket} replies={replies} />}
        <TicketReplyInfoForm
          onSubmit={storeTicketReplyHandler}
          loading={loadingStoreTicketReply}
        />
      </Box>
    </Stepper>
  );
};

export default TicketForms;
