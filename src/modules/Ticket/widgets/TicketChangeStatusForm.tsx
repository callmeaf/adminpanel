import * as React from "react";
import { ITicketModel } from "../models/Ticket";
import { Box } from "@mui/material";
import TableSelectOptionColumnAction, {
  TOnUpdate,
} from "@/modules/Base/components/tables/actions/TableSelectOptionColumnAction";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";

interface ITicketChangeStatusFormProps {
  ticket?: ITicketModel;
  onStatusUpdate: TOnUpdate<ITicketModel>;
}

const TicketChangeStatusForm: React.FC<ITicketChangeStatusFormProps> = ({
  ticket,
  onStatusUpdate,
}) => {
  const { statuses } = localStorageArtisan.enums(EnumSource.TICKET);
  return (
    <Box>
      <TableSelectOptionColumnAction
        name="status"
        defaultValue={ticket.status}
        options={statuses ?? []}
        onUpdate={onStatusUpdate}
        model={ticket}
        disabled={false}
      />
    </Box>
  );
};

export default TicketChangeStatusForm;
