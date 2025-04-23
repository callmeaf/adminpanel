import * as React from "react";
import SettingsTable from "./SettingsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteSetting,
  exportSettings,
  forceDeleteSetting,
  getSettings,
  getSettingsTrashed,
  restoreSetting,
  updateSettingStatus,
  updateSettingType,
} from "@/modules/Setting/requests/setting-requests";
import toSetting, { ISettingModel } from "../models/Setting";
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

interface ISettingsWrapperProps {
  trashed?: boolean;
}

const SettingsWrapper: React.FC<ISettingsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "setting_trashed_table";
  } else {
    TABLE_ID = "setting_list_table";
  }

  const {
    handle: handleGetSettings,
    response: responseGetSettings,
    loading: loadingGetSettings,
  } = useHttp(moduleConfig, trashed ? getSettingsTrashed : getSettings);

  const handlePageChange = (page: number) =>
    handleGetSettings(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetSettings(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetSettings(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetSettings(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetSettings(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ISettingModel> = (setting) => {
    const settingEditRoute = getRouteByName("settings_edit", {
      settingId: setting.id,
    });
    if (settingEditRoute) {
      router.push(settingEditRoute.href);
    }
  };

  const { handle: handleDeleteSetting, loading: loadingDeleteSetting } = useHttp(
    moduleConfig,
    trashed ? forceDeleteSetting : deleteSetting,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteSetting.success_message")
              : tr("deleteSetting.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ISettingModel> = async (setting) => {
    await handleDeleteSetting(
      {},
      {
        settingId: setting.id,
      }
    );
    handleGetSettings();
  };

  const { handle: handleRestoreSetting, loading: loadingRestoreSetting } = useHttp(
    moduleConfig,
    restoreSetting,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreSetting.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ISettingModel> = async (model) => {
    await handleRestoreSetting(
      {},
      {
        settingId: model.id,
      }
    );
    handleGetSettings();
  };

  React.useEffect(() => {
    handleGetSettings(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateSettingStatus } = useHttp(
    moduleConfig,
    updateSettingStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSettingStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateSettingType } = useHttp(
    moduleConfig,
    updateSettingType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSettingType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ISettingModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateSettingStatus(
        {
          status: target.value,
        },
        {
          settingId: model.id,
        }
      );
    } else {
      handleUpdateSettingType(
        {
          type: target.value,
        },
        {
          settingId: model.id,
        }
      );
    }
  };

  const { handle: handleExportSettings } = useHttp(moduleConfig, exportSettings, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportSettings.success_message"),
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
        handleExportSettings(data, {
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
    <SettingsTable
      tableId={TABLE_ID}
      settings={responseGetSettings?.data.map((item) => toSetting(item)) ?? []}
      paginate={toPaginate({
        links: responseGetSettings?.links,
        meta: responseGetSettings?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetSettings}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteSetting}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreSetting}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default SettingsWrapper;
