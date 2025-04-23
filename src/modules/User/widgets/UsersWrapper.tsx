import * as React from "react";
import UsersTable from "./UsersTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteUser,
  exportUsers,
  forceDeleteUser,
  getUsers,
  getUsersTrashed,
  restoreUser,
  updateUserStatus,
  updateUserType,
} from "@/modules/User/requests/user-requests";
import toUser, { IUserModel } from "../models/User";
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

interface IUsersWrapperProps {
  trashed?: boolean;
}

const UsersWrapper: React.FC<IUsersWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "users_trashed_table";
  } else {
    TABLE_ID = "users_list_table";
  }

  const {
    handle: handleGetUsers,
    response: responseGetUsers,
    loading: loadingGetUsers,
  } = useHttp(moduleConfig, trashed ? getUsersTrashed : getUsers);

  const handlePageChange = (page: number) =>
    handleGetUsers(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetUsers(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetUsers(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetUsers(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetUsers(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IUserModel> = (user) => {
    const usersEditRoute = getRouteByName("users_edit", {
      userId: user.id,
    });
    if (usersEditRoute) {
      router.push(usersEditRoute.href);
    }
  };

  const { handle: handleDeleteUser, loading: loadingDeleteUser } = useHttp(
    moduleConfig,
    trashed ? forceDeleteUser : deleteUser,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteUser.success_message")
              : tr("deleteUser.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IUserModel> = async (user) => {
    await handleDeleteUser(
      {},
      {
        userId: user.id,
      }
    );
    handleGetUsers();
  };

  const { handle: handleRestoreUser, loading: loadingRestoreUser } = useHttp(
    moduleConfig,
    restoreUser,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreUser.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IUserModel> = async (model) => {
    await handleRestoreUser(
      {},
      {
        userId: model.id,
      }
    );
    handleGetUsers();
  };

  React.useEffect(() => {
    handleGetUsers(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateUserStatus } = useHttp(
    moduleConfig,
    updateUserStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateUserStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateUserType } = useHttp(
    moduleConfig,
    updateUserType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateUserType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IUserModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateUserStatus(
        {
          status: target.value,
        },
        {
          userId: model.id,
        }
      );
    } else {
      handleUpdateUserType(
        {
          type: target.value,
        },
        {
          userId: model.id,
        }
      );
    }
  };

  const { handle: handleExportUsers } = useHttp(moduleConfig, exportUsers, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportUsers.success_message"),
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
        handleExportUsers(data, {
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
    <UsersTable
      tableId={TABLE_ID}
      users={responseGetUsers?.data.map((item) => toUser(item)) ?? []}
      paginate={toPaginate({
        links: responseGetUsers?.links,
        meta: responseGetUsers?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetUsers}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteUser}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreUser}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default UsersWrapper;
