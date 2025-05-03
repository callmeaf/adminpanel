import * as React from "react";
import AccountStrategyCoinsTable from "./AccountStrategyCoinsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteAccountStrategyCoin,
  exportAccountStrategyCoins,
  forceDeleteAccountStrategyCoin,
  getAccountStrategyCoins,
  getAccountStrategyCoinsTrashed,
  restoreAccountStrategyCoin,
  updateAccountStrategyCoinStatus,
  updateAccountStrategyCoinType,
} from "@/modules/AccountStrategyCoin/requests/account-strategy-coin-requests";
import toAccountStrategyCoin, { IAccountStrategyCoinModel } from "../models/AccountStrategyCoin";
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

interface IAccountStrategyCoinsWrapperProps {
  trashed?: boolean;
}

const AccountStrategyCoinsWrapper: React.FC<IAccountStrategyCoinsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "account_strategy_coin_trashed_table";
  } else {
    TABLE_ID = "account_strategy_coin_list_table";
  }

  const {
    handle: handleGetAccountStrategyCoins,
    response: responseGetAccountStrategyCoins,
    loading: loadingGetAccountStrategyCoins,
  } = useHttp(moduleConfig, trashed ? getAccountStrategyCoinsTrashed : getAccountStrategyCoins);

  const handlePageChange = (page: number) =>
    handleGetAccountStrategyCoins(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetAccountStrategyCoins(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetAccountStrategyCoins(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetAccountStrategyCoins(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetAccountStrategyCoins(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IAccountStrategyCoinModel> = (accountStrategyCoin) => {
    const accountStrategyCoinEditRoute = getRouteByName("account_strategy_coins_edit", {
      accountStrategyCoinId: accountStrategyCoin.id,
    });
    if (accountStrategyCoinEditRoute) {
      router.push(accountStrategyCoinEditRoute.href);
    }
  };

  const { handle: handleDeleteAccountStrategyCoin, loading: loadingDeleteAccountStrategyCoin } = useHttp(
    moduleConfig,
    trashed ? forceDeleteAccountStrategyCoin : deleteAccountStrategyCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteAccountStrategyCoin.success_message")
              : tr("deleteAccountStrategyCoin.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IAccountStrategyCoinModel> = async (accountStrategyCoin) => {
    await handleDeleteAccountStrategyCoin(
      {},
      {
        accountStrategyCoinId: accountStrategyCoin.id,
      }
    );
    handleGetAccountStrategyCoins();
  };

  const { handle: handleRestoreAccountStrategyCoin, loading: loadingRestoreAccountStrategyCoin } = useHttp(
    moduleConfig,
    restoreAccountStrategyCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreAccountStrategyCoin.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IAccountStrategyCoinModel> = async (model) => {
    await handleRestoreAccountStrategyCoin(
      {},
      {
        accountStrategyCoinId: model.id,
      }
    );
    handleGetAccountStrategyCoins();
  };

  React.useEffect(() => {
    handleGetAccountStrategyCoins(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateAccountStrategyCoinStatus } = useHttp(
    moduleConfig,
    updateAccountStrategyCoinStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategyCoinStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateAccountStrategyCoinType } = useHttp(
    moduleConfig,
    updateAccountStrategyCoinType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStrategyCoinType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IAccountStrategyCoinModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateAccountStrategyCoinStatus(
        {
          status: target.value,
        },
        {
          accountStrategyCoinId: model.id,
        }
      );
    } else {
      handleUpdateAccountStrategyCoinType(
        {
          type: target.value,
        },
        {
          accountStrategyCoinId: model.id,
        }
      );
    }
  };

  const { handle: handleExportAccountStrategyCoins } = useHttp(moduleConfig, exportAccountStrategyCoins, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportAccountStrategyCoins.success_message"),
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
        handleExportAccountStrategyCoins(data, {
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
    <AccountStrategyCoinsTable
      tableId={TABLE_ID}
      accountStrategyCoins={responseGetAccountStrategyCoins?.data.map((item) => toAccountStrategyCoin(item)) ?? []}
      paginate={toPaginate({
        links: responseGetAccountStrategyCoins?.links,
        meta: responseGetAccountStrategyCoins?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetAccountStrategyCoins}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteAccountStrategyCoin}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreAccountStrategyCoin}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default AccountStrategyCoinsWrapper;
