import * as React from "react";
import TicketsTable from "./TicketsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteTicket,
  exportTickets,
  forceDeleteTicket,
  getTickets,
  getTicketsTrashed,
  restoreTicket,
  updateTicketStatus,
  updateTicketType,
} from "@/modules/Ticket/requests/ticket-requests";
import toTicket, { ITicketModel } from "../models/Ticket";
import toPaginate from "@/modules/Base/models/Paginate";
import { localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";
import { TOnDatesChange } from "@/modules/Base/components/tables/TableDates";
import moduleConfig from "../module.config";
import { TOnFilter } from "@/modules/Base/components/tables/TableFilter";
import { TOnEdit } from "@/modules/Base/components/tables/actions/TableEditAction";
import { TOnDelete } from "@/modules/Base/components/tables/actions/TableDeleteAction";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import { useRouter } from "@/i18n/routing";
import useRoutes from "@/modules/Base/hooks/use-routes";
import { TOnUpdate } from "@/modules/Base/components/tables/actions/TableSelectOptionColumnAction";
import {
  ExportType,
  TOnExport,
} from "@/modules/Base/components/tables/TableExport";
import { TOnRestore } from "@/modules/Base/components/tables/actions/TableRestoreAction";

let TABLE_ID: string;

interface ITicketsWrapperProps {
  trashed?: boolean;
}

const TicketsWrapper: React.FC<ITicketsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "ticket_trashed_table";
  } else {
    TABLE_ID = "ticket_list_table";
  }

  const {
    handle: handleGetTickets,
    response: responseGetTickets,
    loading: loadingGetTickets,
  } = useHttp(moduleConfig, trashed ? getTicketsTrashed : getTickets);

  const handlePageChange = (page: number) =>
    handleGetTickets(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetTickets(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetTickets(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetTickets(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetTickets(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ITicketModel> = (ticket) => {
    const ticketEditRoute = getRouteByName("tickets_edit", {
      ticketId: ticket.id,
    });
    if (ticketEditRoute) {
      router.push(ticketEditRoute.href);
    }
  };

  const { handle: handleDeleteTicket, loading: loadingDeleteTicket } = useHttp(
    moduleConfig,
    trashed ? forceDeleteTicket : deleteTicket,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteTicket.success_message")
              : tr("deleteTicket.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ITicketModel> = async (ticket) => {
    await handleDeleteTicket(
      {},
      {
        ticketId: ticket.id,
      }
    );
    handleGetTickets();
  };

  const { handle: handleRestoreTicket, loading: loadingRestoreTicket } = useHttp(
    moduleConfig,
    restoreTicket,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreTicket.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ITicketModel> = async (model) => {
    await handleRestoreTicket(
      {},
      {
        ticketId: model.id,
      }
    );
    handleGetTickets();
  };

  React.useEffect(() => {
    handleGetTickets(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateTicketStatus } = useHttp(
    moduleConfig,
    updateTicketStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicketStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateTicketType } = useHttp(
    moduleConfig,
    updateTicketType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicketType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ITicketModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateTicketStatus(
        {
          status: target.value,
        },
        {
          ticketId: model.id,
        }
      );
    } else {
      handleUpdateTicketType(
        {
          type: target.value,
        },
        {
          ticketId: model.id,
        }
      );
    }
  };

  const { handle: handleExportTickets } = useHttp(moduleConfig, exportTickets, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportTickets.success_message"),
        },
      });
    },
  });
  const handleExport: TOnExport = (type, data) => {
    data = {
      ...(localStorageArtisan.get(TABLE_ID, true) ?? {}),
      page: data.page,
      trashed,
    };
    switch (type) {
      case ExportType.EXCEL: {
        handleExportTickets(data, {
          type,
        });
        break;
      }
      default: {
        console.warn(`No export type find for ( ${type} )`);
      }
    }
  };

  return (
    <TicketsTable
      tableId={TABLE_ID}
      tickets={responseGetTickets?.data.map((item) => toTicket(item)) ?? []}
      paginate={toPaginate({
        links: responseGetTickets?.links,
        meta: responseGetTickets?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetTickets}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteTicket}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreTicket}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default TicketsWrapper;
