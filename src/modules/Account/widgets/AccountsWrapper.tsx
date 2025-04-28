import * as React from "react";
import AccountsTable from "./AccountsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteAccount,
  exportAccounts,
  forceDeleteAccount,
  getAccounts,
  getAccountsTrashed,
  restoreAccount,
  updateAccountStatus,
  updateAccountType,
} from "@/modules/Account/requests/account-requests";
import toAccount, { IAccountModel } from "../models/Account";
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

interface IAccountsWrapperProps {
  trashed?: boolean;
}

const AccountsWrapper: React.FC<IAccountsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "account_trashed_table";
  } else {
    TABLE_ID = "account_list_table";
  }

  const {
    handle: handleGetAccounts,
    response: responseGetAccounts,
    loading: loadingGetAccounts,
  } = useHttp(moduleConfig, trashed ? getAccountsTrashed : getAccounts);

  const handlePageChange = (page: number) =>
    handleGetAccounts(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetAccounts(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetAccounts(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetAccounts(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetAccounts(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IAccountModel> = (account) => {
    const accountEditRoute = getRouteByName("accounts_edit", {
      accountId: account.id,
    });
    if (accountEditRoute) {
      router.push(accountEditRoute.href);
    }
  };

  const { handle: handleDeleteAccount, loading: loadingDeleteAccount } = useHttp(
    moduleConfig,
    trashed ? forceDeleteAccount : deleteAccount,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteAccount.success_message")
              : tr("deleteAccount.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IAccountModel> = async (account) => {
    await handleDeleteAccount(
      {},
      {
        accountId: account.id,
      }
    );
    handleGetAccounts();
  };

  const { handle: handleRestoreAccount, loading: loadingRestoreAccount } = useHttp(
    moduleConfig,
    restoreAccount,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreAccount.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IAccountModel> = async (model) => {
    await handleRestoreAccount(
      {},
      {
        accountId: model.id,
      }
    );
    handleGetAccounts();
  };

  React.useEffect(() => {
    handleGetAccounts(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateAccountStatus } = useHttp(
    moduleConfig,
    updateAccountStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateAccountType } = useHttp(
    moduleConfig,
    updateAccountType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateAccountType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IAccountModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateAccountStatus(
        {
          status: target.value,
        },
        {
          accountId: model.id,
        }
      );
    } else {
      handleUpdateAccountType(
        {
          type: target.value,
        },
        {
          accountId: model.id,
        }
      );
    }
  };

  const { handle: handleExportAccounts } = useHttp(moduleConfig, exportAccounts, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportAccounts.success_message"),
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
        handleExportAccounts(data, {
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
    <AccountsTable
      tableId={TABLE_ID}
      accounts={responseGetAccounts?.data.map((item) => toAccount(item)) ?? []}
      paginate={toPaginate({
        links: responseGetAccounts?.links,
        meta: responseGetAccounts?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetAccounts}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteAccount}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreAccount}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default AccountsWrapper;
