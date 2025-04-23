import * as React from "react";
import CoinsTable from "./CoinsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteCoin,
  exportCoins,
  forceDeleteCoin,
  getCoins,
  getCoinsTrashed,
  restoreCoin,
  updateCoinStatus,
  updateCoinType,
} from "@/modules/Coin/requests/coin-requests";
import toCoin, { ICoinModel } from "../models/Coin";
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

interface ICoinsWrapperProps {
  trashed?: boolean;
}

const CoinsWrapper: React.FC<ICoinsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "coin_trashed_table";
  } else {
    TABLE_ID = "coin_list_table";
  }

  const {
    handle: handleGetCoins,
    response: responseGetCoins,
    loading: loadingGetCoins,
  } = useHttp(moduleConfig, trashed ? getCoinsTrashed : getCoins);

  const handlePageChange = (page: number) =>
    handleGetCoins(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetCoins(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetCoins(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetCoins(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetCoins(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ICoinModel> = (coin) => {
    const coinEditRoute = getRouteByName("coins_edit", {
      coinId: coin.id,
    });
    if (coinEditRoute) {
      router.push(coinEditRoute.href);
    }
  };

  const { handle: handleDeleteCoin, loading: loadingDeleteCoin } = useHttp(
    moduleConfig,
    trashed ? forceDeleteCoin : deleteCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteCoin.success_message")
              : tr("deleteCoin.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ICoinModel> = async (coin) => {
    await handleDeleteCoin(
      {},
      {
        coinId: coin.id,
      }
    );
    handleGetCoins();
  };

  const { handle: handleRestoreCoin, loading: loadingRestoreCoin } = useHttp(
    moduleConfig,
    restoreCoin,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreCoin.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ICoinModel> = async (model) => {
    await handleRestoreCoin(
      {},
      {
        coinId: model.id,
      }
    );
    handleGetCoins();
  };

  React.useEffect(() => {
    handleGetCoins(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateCoinStatus } = useHttp(
    moduleConfig,
    updateCoinStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateCoinStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateCoinType } = useHttp(
    moduleConfig,
    updateCoinType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateCoinType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ICoinModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateCoinStatus(
        {
          status: target.value,
        },
        {
          coinId: model.id,
        }
      );
    } else {
      handleUpdateCoinType(
        {
          type: target.value,
        },
        {
          coinId: model.id,
        }
      );
    }
  };

  const { handle: handleExportCoins } = useHttp(moduleConfig, exportCoins, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportCoins.success_message"),
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
        handleExportCoins(data, {
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
    <CoinsTable
      tableId={TABLE_ID}
      coins={responseGetCoins?.data.map((item) => toCoin(item)) ?? []}
      paginate={toPaginate({
        links: responseGetCoins?.links,
        meta: responseGetCoins?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetCoins}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteCoin}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreCoin}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default CoinsWrapper;
