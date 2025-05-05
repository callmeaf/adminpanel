import * as React from "react";
import VersionsTable from "./VersionsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteVersion,
  exportVersions,
  forceDeleteVersion,
  getVersions,
  getVersionsTrashed,
  restoreVersion,
  updateVersionStatus,
  updateVersionType,
} from "@/modules/Version/requests/version-requests";
import toVersion, { IVersionModel } from "../models/Version";
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

interface IVersionsWrapperProps {
  trashed?: boolean;
}

const VersionsWrapper: React.FC<IVersionsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "version_trashed_table";
  } else {
    TABLE_ID = "version_list_table";
  }

  const {
    handle: handleGetVersions,
    response: responseGetVersions,
    loading: loadingGetVersions,
  } = useHttp(moduleConfig, trashed ? getVersionsTrashed : getVersions);

  const handlePageChange = (page: number) =>
    handleGetVersions(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetVersions(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetVersions(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetVersions(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetVersions(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IVersionModel> = (version) => {
    const versionEditRoute = getRouteByName("versions_edit", {
      versionId: version.id,
    });
    if (versionEditRoute) {
      router.push(versionEditRoute.href);
    }
  };

  const { handle: handleDeleteVersion, loading: loadingDeleteVersion } = useHttp(
    moduleConfig,
    trashed ? forceDeleteVersion : deleteVersion,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteVersion.success_message")
              : tr("deleteVersion.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IVersionModel> = async (version) => {
    await handleDeleteVersion(
      {},
      {
        versionId: version.id,
      }
    );
    handleGetVersions();
  };

  const { handle: handleRestoreVersion, loading: loadingRestoreVersion } = useHttp(
    moduleConfig,
    restoreVersion,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreVersion.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IVersionModel> = async (model) => {
    await handleRestoreVersion(
      {},
      {
        versionId: model.id,
      }
    );
    handleGetVersions();
  };

  React.useEffect(() => {
    handleGetVersions(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateVersionStatus } = useHttp(
    moduleConfig,
    updateVersionStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateVersionStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateVersionType } = useHttp(
    moduleConfig,
    updateVersionType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateVersionType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IVersionModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateVersionStatus(
        {
          status: target.value,
        },
        {
          versionId: model.id,
        }
      );
    } else {
      handleUpdateVersionType(
        {
          type: target.value,
        },
        {
          versionId: model.id,
        }
      );
    }
  };

  const { handle: handleExportVersions } = useHttp(moduleConfig, exportVersions, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportVersions.success_message"),
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
        handleExportVersions(data, {
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
    <VersionsTable
      tableId={TABLE_ID}
      versions={responseGetVersions?.data.map((item) => toVersion(item)) ?? []}
      paginate={toPaginate({
        links: responseGetVersions?.links,
        meta: responseGetVersions?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetVersions}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteVersion}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreVersion}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default VersionsWrapper;
