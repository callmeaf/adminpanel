import * as React from "react";
import AccountStrategiesTable from "./AccountStrategiesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteAccountStrategy,
  exportAccountStrategies,
  forceDeleteAccountStrategy,
  getAccountStrategies,
  getAccountStrategiesTrashed,
  restoreAccountStrategy,
  updateAccountStrategyStatus,
  updateAccountStrategyType,
} from "@/modules/AccountStrategy/requests/account-strategy-requests";
import toAccountStrategy, { IAccountStrategyModel } from "../models/AccountStrategy";
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

interface IAccountStrategiesWrapperProps {
  trashed?: boolean;
}

const AccountStrategiesWrapper: React.FC<IAccountStrategiesWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "account_strategy_trashed_table";
  } else {
    TABLE_ID = "account_strategy_list_table";
  }

  const {
    handle: handleGetAccountStrategies,
    response: responseGetAccountStrategies,
    loading: loadingGetAccountStrategies,
  } = useHttp(moduleConfig, trashed ? getAccountStrategiesTrashed : getAccountStrategies);

  const handlePageChange = (page: number) =>
    handleGetAccountStrategies(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetAccountStrategies(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetAccountStrategies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetAccountStrategies(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetAccountStrategies(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IAccountStrategyModel> = (accountStrategy) => {
    const accountStrategyEditRoute = getRouteByName("account_strategies_edit", {
      accountStrategyId: accountStrategy.id,
    });
    if (accountStrategyEditRoute) {
      router.push(accountStrategyEditRoute.href);
    }
  };

  const { handle: handleDeleteAccountStrategy, loading: loadingDeleteAccountStrategy } = useHttp(
    moduleConfig,
    trashed ? forceDeleteAccountStrategy : deleteAccountStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteAccountStrategy.success_message")
              : tr("deleteAccountStrategy.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IAccountStrategyModel> = async (accountStrategy) => {
    await handleDeleteAccountStrategy(
      {},
      {
        accountStrategyId: accountStrategy.id,
      }
    );
    handleGetAccountStrategies();
  };

  const { handle: handleRestoreAccountStrategy, loading: loadingRestoreAccountStrategy } = useHttp(
    moduleConfig,
    restoreAccountStrategy,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreAccountStrategy.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IAccountStrategyModel> = async (model) => {
    await handleRestoreAccountStrategy(
      {},
      {
        accountStrategyId: model.id,
      }
    );
    handleGetAccountStrategies();
  };

  React.useEffect(() => {
    handleGetAccountStrategies(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateAccountStrategyStatus } = useHttp(
    moduleConfig,
    updateAccountStrategyStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategyStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateAccountStrategyType } = useHttp(
    moduleConfig,
    updateAccountStrategyType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategyType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IAccountStrategyModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateAccountStrategyStatus(
        {
          status: target.value,
        },
        {
          accountStrategyId: model.id,
        }
      );
    } else {
      handleUpdateAccountStrategyType(
        {
          type: target.value,
        },
        {
          accountStrategyId: model.id,
        }
      );
    }
  };

  const { handle: handleExportAccountStrategies } = useHttp(moduleConfig, exportAccountStrategies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportAccountStrategies.success_message"),
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
        handleExportAccountStrategies(data, {
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
    <AccountStrategiesTable
      tableId={TABLE_ID}
      accountStrategies={responseGetAccountStrategies?.data.map((item) => toAccountStrategy(item)) ?? []}
      paginate={toPaginate({
        links: responseGetAccountStrategies?.links,
        meta: responseGetAccountStrategies?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetAccountStrategies}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteAccountStrategy}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreAccountStrategy}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default AccountStrategiesWrapper;
