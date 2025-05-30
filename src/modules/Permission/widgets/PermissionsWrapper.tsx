import * as React from "react";
import PermissionsTable from "./PermissionsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deletePermission,
  exportPermissions,
  forceDeletePermission,
  getPermissions,
  getPermissionsTrashed,
  restorePermission,
  updatePermissionStatus,
  updatePermissionType,
} from "@/modules/Permission/requests/permission-requests";
import toPermission, { IPermissionModel } from "../models/Permission";
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

interface IPermissionsWrapperProps {
  trashed?: boolean;
}

const PermissionsWrapper: React.FC<IPermissionsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "permission_trashed_table";
  } else {
    TABLE_ID = "permission_list_table";
  }

  const {
    handle: handleGetPermissions,
    response: responseGetPermissions,
    loading: loadingGetPermissions,
  } = useHttp(moduleConfig, trashed ? getPermissionsTrashed : getPermissions);

  const handlePageChange = (page: number) =>
    handleGetPermissions(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetPermissions(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetPermissions(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetPermissions(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetPermissions(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IPermissionModel> = (permission) => {
    const permissionEditRoute = getRouteByName("permissions_edit", {
      permissionId: permission.id,
    });
    if (permissionEditRoute) {
      router.push(permissionEditRoute.href);
    }
  };

  const { handle: handleDeletePermission, loading: loadingDeletePermission } = useHttp(
    moduleConfig,
    trashed ? forceDeletePermission : deletePermission,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeletePermission.success_message")
              : tr("deletePermission.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IPermissionModel> = async (permission) => {
    await handleDeletePermission(
      {},
      {
        permissionId: permission.id,
      }
    );
    handleGetPermissions();
  };

  const { handle: handleRestorePermission, loading: loadingRestorePermission } = useHttp(
    moduleConfig,
    restorePermission,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restorePermission.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IPermissionModel> = async (model) => {
    await handleRestorePermission(
      {},
      {
        permissionId: model.id,
      }
    );
    handleGetPermissions();
  };

  React.useEffect(() => {
    handleGetPermissions(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdatePermissionStatus } = useHttp(
    moduleConfig,
    updatePermissionStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updatePermissionStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdatePermissionType } = useHttp(
    moduleConfig,
    updatePermissionType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updatePermissionType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IPermissionModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdatePermissionStatus(
        {
          status: target.value,
        },
        {
          permissionId: model.id,
        }
      );
    } else {
      handleUpdatePermissionType(
        {
          type: target.value,
        },
        {
          permissionId: model.id,
        }
      );
    }
  };

  const { handle: handleExportPermissions } = useHttp(moduleConfig, exportPermissions, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportPermissions.success_message"),
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
        handleExportPermissions(data, {
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
    <PermissionsTable
      tableId={TABLE_ID}
      permissions={responseGetPermissions?.data.map((item) => toPermission(item)) ?? []}
      paginate={toPaginate({
        links: responseGetPermissions?.links,
        meta: responseGetPermissions?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetPermissions}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeletePermission}
      onRestore={handleRestore}
      loadingRestore={loadingRestorePermission}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default PermissionsWrapper;
