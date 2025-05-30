import * as React from "react";
import RolesTable from "./RolesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteRole,
  exportRoles,
  forceDeleteRole,
  getRoles,
  getRolesTrashed,
  restoreRole,
  updateRoleStatus,
  updateRoleType,
} from "@/modules/Role/requests/role-requests";
import toRole, { IRoleModel } from "../models/Role";
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

interface IRolesWrapperProps {
  trashed?: boolean;
}

const RolesWrapper: React.FC<IRolesWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "role_trashed_table";
  } else {
    TABLE_ID = "role_list_table";
  }

  const {
    handle: handleGetRoles,
    response: responseGetRoles,
    loading: loadingGetRoles,
  } = useHttp(moduleConfig, trashed ? getRolesTrashed : getRoles);

  const handlePageChange = (page: number) =>
    handleGetRoles(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetRoles(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetRoles(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetRoles(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetRoles(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IRoleModel> = (role) => {
    const roleEditRoute = getRouteByName("roles_edit", {
      roleId: role.id,
    });
    if (roleEditRoute) {
      router.push(roleEditRoute.href);
    }
  };

  const { handle: handleDeleteRole, loading: loadingDeleteRole } = useHttp(
    moduleConfig,
    trashed ? forceDeleteRole : deleteRole,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteRole.success_message")
              : tr("deleteRole.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IRoleModel> = async (role) => {
    await handleDeleteRole(
      {},
      {
        roleId: role.id,
      }
    );
    handleGetRoles();
  };

  const { handle: handleRestoreRole, loading: loadingRestoreRole } = useHttp(
    moduleConfig,
    restoreRole,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreRole.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IRoleModel> = async (model) => {
    await handleRestoreRole(
      {},
      {
        roleId: model.id,
      }
    );
    handleGetRoles();
  };

  React.useEffect(() => {
    handleGetRoles(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateRoleStatus } = useHttp(
    moduleConfig,
    updateRoleStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateRoleStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateRoleType } = useHttp(
    moduleConfig,
    updateRoleType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateRoleType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IRoleModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateRoleStatus(
        {
          status: target.value,
        },
        {
          roleId: model.id,
        }
      );
    } else {
      handleUpdateRoleType(
        {
          type: target.value,
        },
        {
          roleId: model.id,
        }
      );
    }
  };

  const { handle: handleExportRoles } = useHttp(moduleConfig, exportRoles, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportRoles.success_message"),
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
        handleExportRoles(data, {
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
    <RolesTable
      tableId={TABLE_ID}
      roles={responseGetRoles?.data.map((item) => toRole(item)) ?? []}
      paginate={toPaginate({
        links: responseGetRoles?.links,
        meta: responseGetRoles?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetRoles}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteRole}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreRole}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default RolesWrapper;
