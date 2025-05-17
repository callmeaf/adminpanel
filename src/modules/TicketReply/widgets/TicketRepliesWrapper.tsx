import * as React from "react";
import TicketRepliesTable from "./TicketRepliesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteTicketReply,
  exportTicketReplies,
  forceDeleteTicketReply,
  getTicketReplies,
  getTicketRepliesTrashed,
  restoreTicketReply,
  updateTicketReplyStatus,
  updateTicketReplyType,
} from "@/modules/TicketReply/requests/ticket-reply-requests";
import toTicketReply, { ITicketReplyModel } from "../models/TicketReply";
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

interface ITicketRepliesWrapperProps {
  trashed?: boolean;
}

const TicketRepliesWrapper: React.FC<ITicketRepliesWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "ticket_reply_trashed_table";
  } else {
    TABLE_ID = "ticket_reply_list_table";
  }

  const {
    handle: handleGetTicketReplies,
    response: responseGetTicketReplies,
    loading: loadingGetTicketReplies,
  } = useHttp(moduleConfig, trashed ? getTicketRepliesTrashed : getTicketReplies);

  const handlePageChange = (page: number) =>
    handleGetTicketReplies(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetTicketReplies(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetTicketReplies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetTicketReplies(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetTicketReplies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ITicketReplyModel> = (ticketReply) => {
    const ticketReplyEditRoute = getRouteByName("ticket_replies_edit", {
      ticketReplyId: ticketReply.id,
    });
    if (ticketReplyEditRoute) {
      router.push(ticketReplyEditRoute.href);
    }
  };

  const { handle: handleDeleteTicketReply, loading: loadingDeleteTicketReply } = useHttp(
    moduleConfig,
    trashed ? forceDeleteTicketReply : deleteTicketReply,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteTicketReply.success_message")
              : tr("deleteTicketReply.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ITicketReplyModel> = async (ticketReply) => {
    await handleDeleteTicketReply(
      {},
      {
        ticketReplyId: ticketReply.id,
      }
    );
    handleGetTicketReplies();
  };

  const { handle: handleRestoreTicketReply, loading: loadingRestoreTicketReply } = useHttp(
    moduleConfig,
    restoreTicketReply,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreTicketReply.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ITicketReplyModel> = async (model) => {
    await handleRestoreTicketReply(
      {},
      {
        ticketReplyId: model.id,
      }
    );
    handleGetTicketReplies();
  };

  React.useEffect(() => {
    handleGetTicketReplies(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateTicketReplyStatus } = useHttp(
    moduleConfig,
    updateTicketReplyStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicketReplyStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateTicketReplyType } = useHttp(
    moduleConfig,
    updateTicketReplyType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateTicketReplyType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ITicketReplyModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateTicketReplyStatus(
        {
          status: target.value,
        },
        {
          ticketReplyId: model.id,
        }
      );
    } else {
      handleUpdateTicketReplyType(
        {
          type: target.value,
        },
        {
          ticketReplyId: model.id,
        }
      );
    }
  };

  const { handle: handleExportTicketReplies } = useHttp(moduleConfig, exportTicketReplies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportTicketReplies.success_message"),
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
        handleExportTicketReplies(data, {
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
    <TicketRepliesTable
      tableId={TABLE_ID}
      ticketReplies={responseGetTicketReplies?.data.map((item) => toTicketReply(item)) ?? []}
      paginate={toPaginate({
        links: responseGetTicketReplies?.links,
        meta: responseGetTicketReplies?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetTicketReplies}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteTicketReply}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreTicketReply}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default TicketRepliesWrapper;
