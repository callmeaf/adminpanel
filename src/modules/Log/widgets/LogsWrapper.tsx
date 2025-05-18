import * as React from "react";
import LogsTable from "./LogsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteLog,
  exportLogs,
  forceDeleteLog,
  getLogs,
  getLogsTrashed,
  restoreLog,
  updateLogStatus,
  updateLogType,
} from "@/modules/Log/requests/log-requests";
import toLog, { ILogModel } from "../models/Log";
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

interface ILogsWrapperProps {
  trashed?: boolean;
}

const LogsWrapper: React.FC<ILogsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "log_trashed_table";
  } else {
    TABLE_ID = "log_list_table";
  }

  const {
    handle: handleGetLogs,
    response: responseGetLogs,
    loading: loadingGetLogs,
  } = useHttp(moduleConfig, trashed ? getLogsTrashed : getLogs);

  const handlePageChange = (page: number) =>
    handleGetLogs(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetLogs(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetLogs(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetLogs(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetLogs(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ILogModel> = (log) => {
    const logEditRoute = getRouteByName("logs_edit", {
      logId: log.id,
    });
    if (logEditRoute) {
      router.push(logEditRoute.href);
    }
  };

  const { handle: handleDeleteLog, loading: loadingDeleteLog } = useHttp(
    moduleConfig,
    trashed ? forceDeleteLog : deleteLog,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteLog.success_message")
              : tr("deleteLog.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ILogModel> = async (log) => {
    await handleDeleteLog(
      {},
      {
        logId: log.id,
      }
    );
    handleGetLogs();
  };

  const { handle: handleRestoreLog, loading: loadingRestoreLog } = useHttp(
    moduleConfig,
    restoreLog,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreLog.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ILogModel> = async (model) => {
    await handleRestoreLog(
      {},
      {
        logId: model.id,
      }
    );
    handleGetLogs();
  };

  React.useEffect(() => {
    handleGetLogs(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateLogStatus } = useHttp(
    moduleConfig,
    updateLogStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateLogStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateLogType } = useHttp(
    moduleConfig,
    updateLogType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateLogType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ILogModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateLogStatus(
        {
          status: target.value,
        },
        {
          logId: model.id,
        }
      );
    } else {
      handleUpdateLogType(
        {
          type: target.value,
        },
        {
          logId: model.id,
        }
      );
    }
  };

  const { handle: handleExportLogs } = useHttp(moduleConfig, exportLogs, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportLogs.success_message"),
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
        handleExportLogs(data, {
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
    <LogsTable
      tableId={TABLE_ID}
      logs={responseGetLogs?.data.map((item) => toLog(item)) ?? []}
      paginate={toPaginate({
        links: responseGetLogs?.links,
        meta: responseGetLogs?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetLogs}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteLog}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreLog}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default LogsWrapper;
