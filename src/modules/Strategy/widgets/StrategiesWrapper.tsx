import * as React from "react";
import StrategiesTable from "./StrategiesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteStrategy,
  exportStrategies,
  forceDeleteStrategy,
  getStrategies,
  getStrategiesTrashed,
  restoreStrategy,
  updateStrategyStatus,
  updateStrategyType,
} from "@/modules/Strategy/requests/strategy-requests";
import toStrategy, { IStrategyModel } from "../models/Strategy";
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

interface IStrategiesWrapperProps {
  trashed?: boolean;
}

const StrategiesWrapper: React.FC<IStrategiesWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "strategy_trashed_table";
  } else {
    TABLE_ID = "strategy_list_table";
  }

  const {
    handle: handleGetStrategies,
    response: responseGetStrategies,
    loading: loadingGetStrategies,
  } = useHttp(moduleConfig, trashed ? getStrategiesTrashed : getStrategies);

  const handlePageChange = (page: number) =>
    handleGetStrategies(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetStrategies(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetStrategies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetStrategies(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetStrategies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IStrategyModel> = (strategy) => {
    const strategyEditRoute = getRouteByName("strategies_edit", {
      strategyId: strategy.id,
    });
    if (strategyEditRoute) {
      router.push(strategyEditRoute.href);
    }
  };

  const { handle: handleDeleteStrategy, loading: loadingDeleteStrategy } = useHttp(
    moduleConfig,
    trashed ? forceDeleteStrategy : deleteStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteStrategy.success_message")
              : tr("deleteStrategy.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IStrategyModel> = async (strategy) => {
    await handleDeleteStrategy(
      {},
      {
        strategyId: strategy.id,
      }
    );
    handleGetStrategies();
  };

  const { handle: handleRestoreStrategy, loading: loadingRestoreStrategy } = useHttp(
    moduleConfig,
    restoreStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreStrategy.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IStrategyModel> = async (model) => {
    await handleRestoreStrategy(
      {},
      {
        strategyId: model.id,
      }
    );
    handleGetStrategies();
  };

  React.useEffect(() => {
    handleGetStrategies(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateStrategyStatus } = useHttp(
    moduleConfig,
    updateStrategyStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateStrategyStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateStrategyType } = useHttp(
    moduleConfig,
    updateStrategyType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateStrategyType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IStrategyModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateStrategyStatus(
        {
          status: target.value,
        },
        {
          strategyId: model.id,
        }
      );
    } else {
      handleUpdateStrategyType(
        {
          type: target.value,
        },
        {
          strategyId: model.id,
        }
      );
    }
  };

  const { handle: handleExportStrategies } = useHttp(moduleConfig, exportStrategies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportStrategies.success_message"),
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
        handleExportStrategies(data, {
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
    <StrategiesTable
      tableId={TABLE_ID}
      strategies={responseGetStrategies?.data.map((item) => toStrategy(item)) ?? []}
      paginate={toPaginate({
        links: responseGetStrategies?.links,
        meta: responseGetStrategies?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetStrategies}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteStrategy}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreStrategy}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default StrategiesWrapper;
