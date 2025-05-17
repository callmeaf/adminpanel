"use client";

import TicketForms from "../widgets/TicketForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toTicket, { ITicketModel } from "../models/Ticket";
import useHttp from "@/modules/Base/hooks/use-http";
import { getTicketByKey } from "../requests/ticket-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ITicketEditPageProps {}

const TicketEditPage: React.FC<ITicketEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [ticket, setTicket] = React.useState<ITicketModel | undefined>(undefined);

  const { handle: handleGetTicketByKey, loading: loadingGetTicketByKey } = useHttp(
    moduleConfig,
    getTicketByKey,
    {
      onSuccess: (res) => {
        setTicket(toTicket(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetTicketByKey(
      {},
      {
        key: params.ticketId,
      }
    );
  }, [params.ticketId]);

  return (
    <DashboardLayout>
      <Show when={!!ticket}>
        <Show.When>
          <TicketForms ticketModel={ticket} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetTicketByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default TicketEditPage;
