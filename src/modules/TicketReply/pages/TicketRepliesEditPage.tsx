"use client";

import TicketReplyForms from "../widgets/TicketReplyForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toTicketReply, { ITicketReplyModel } from "../models/TicketReply";
import useHttp from "@/modules/Base/hooks/use-http";
import { getTicketReplyByKey } from "../requests/ticket-reply-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ITicketReplyEditPageProps {}

const TicketReplyEditPage: React.FC<ITicketReplyEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [ticketReply, setTicketReply] = React.useState<ITicketReplyModel | undefined>(undefined);

  const { handle: handleGetTicketReplyByKey, loading: loadingGetTicketReplyByKey } = useHttp(
    moduleConfig,
    getTicketReplyByKey,
    {
      onSuccess: (res) => {
        setTicketReply(toTicketReply(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetTicketReplyByKey(
      {},
      {
        key: params.ticketReplyId,
      }
    );
  }, [params.ticketReplyId]);

  return (
    <DashboardLayout>
      <Show when={!!ticketReply}>
        <Show.When>
          <TicketReplyForms ticketReplyModel={ticketReply} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetTicketReplyByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default TicketReplyEditPage;
