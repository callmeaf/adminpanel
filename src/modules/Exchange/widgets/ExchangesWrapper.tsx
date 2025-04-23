import * as React from "react";
import ExchangesTable from "./ExchangesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteExchange,
  exportExchanges,
  forceDeleteExchange,
  getExchanges,
  getExchangesTrashed,
  restoreExchange,
  updateExchangeStatus,
  updateExchangeType,
} from "@/modules/Exchange/requests/exchange-requests";
import toExchange, { IExchangeModel } from "../models/Exchange";
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

interface IExchangesWrapperProps {
  trashed?: boolean;
}

const ExchangesWrapper: React.FC<IExchangesWrapperProps> = ({
  trashed = false,
}) => {
  if (trashed) {
    TABLE_ID = "exchange_trashed_table";
  } else {
    TABLE_ID = "exchange_list_table";
  }

  const {
    handle: handleGetExchanges,
    response: responseGetExchanges,
    loading: loadingGetExchanges,
  } = useHttp(moduleConfig, trashed ? getExchangesTrashed : getExchanges);

  const handlePageChange = (page: number) =>
    handleGetExchanges(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetExchanges(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetExchanges(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetExchanges(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetExchanges(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IExchangeModel> = (exchange) => {
    const exchangeEditRoute = getRouteByName("exchanges_edit", {
      exchangeId: exchange.id,
    });
    if (exchangeEditRoute) {
      router.push(exchangeEditRoute.href);
    }
  };

  const { handle: handleDeleteExchange, loading: loadingDeleteExchange } =
    useHttp(moduleConfig, trashed ? forceDeleteExchange : deleteExchange, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteExchange.success_message")
              : tr("deleteExchange.success_message"),
          },
        });
      },
    });
  const handleDelete: TOnDelete<IExchangeModel> = async (exchange) => {
    await handleDeleteExchange(
      {},
      {
        exchangeId: exchange.id,
      }
    );
    handleGetExchanges();
  };

  const { handle: handleRestoreExchange, loading: loadingRestoreExchange } =
    useHttp(moduleConfig, restoreExchange, {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreExchange.success_message"),
          },
        });
      },
    });

  const handleRestore: TOnRestore<IExchangeModel> = async (model) => {
    await handleRestoreExchange(
      {},
      {
        exchangeId: model.id,
      }
    );
    handleGetExchanges();
  };

  React.useEffect(() => {
    handleGetExchanges(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateExchangeStatus } = useHttp(
    moduleConfig,
    updateExchangeStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateExchangeStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateExchangeType } = useHttp(
    moduleConfig,
    updateExchangeType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateExchangeType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IExchangeModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateExchangeStatus(
        {
          status: target.value,
        },
        {
          exchangeId: model.id,
        }
      );
    } else {
      handleUpdateExchangeType(
        {
          type: target.value,
        },
        {
          exchangeId: model.id,
        }
      );
    }
  };

  const { handle: handleExportExchanges } = useHttp(
    moduleConfig,
    exportExchanges,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("exportExchanges.success_message"),
          },
        });
      },
    }
  );
  const handleExport: TOnExport = (type, data) => {
    data = {
      ...(localStorageArtisan.get(TABLE_ID, true) ?? {}),
      page: data.page,
      trashed,
    };
    switch (type) {
      case ExportType.EXCEL: {
        handleExportExchanges(data, {
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
    <ExchangesTable
      tableId={TABLE_ID}
      exchanges={
        responseGetExchanges?.data.map((item) => toExchange(item)) ?? []
      }
      paginate={toPaginate({
        links: responseGetExchanges?.links,
        meta: responseGetExchanges?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetExchanges}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteExchange}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreExchange}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default ExchangesWrapper;
