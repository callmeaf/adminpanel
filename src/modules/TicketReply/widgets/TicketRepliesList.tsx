import * as React from "react";
import { ITicketReplyModel } from "../models/TicketReply";
import { Box, Stack } from "@mui/material";
import { ITicketModel } from "@/modules/Ticket/models/Ticket";
import TicketRepliesListItem from "./TicketRepliesListItem";

interface ITicketRepliesListProps {
  ticket: ITicketModel;
  replies: ITicketReplyModel[];
}

const TicketRepliesList: React.FC<ITicketRepliesListProps> = ({
  ticket,
  replies,
}) => {
  return (
    <Box sx={{ p: 2, maxHeight: "500px", overflowY: "auto" }}>
      <Stack spacing={2}>
        {replies.map((reply) => {
          return (
            <TicketRepliesListItem
              key={reply.id}
              reply={reply}
              authUserIsSender={
                reply.senderIdentifier === ticket.senderIdentifier
              }
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default TicketRepliesList;
