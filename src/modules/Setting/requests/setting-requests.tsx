import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ISettingDeleteResponse,
  ISettingGetByKeyResponse,
  ISettingsResponse,
  ISettingStoreResponse,
  ISettingStatusUpdateResponse,
  ISettingTypeUpdateResponse,
  ISettingsExportResponse,
  ISettingsImportResponse,
  ISettingsTrashedResponse,
  ISettingRestoreResponse,
  ISettingForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getSettings: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISettingsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "settings",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeSetting: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  ISettingStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("settings", formData);
};

export const getSettingByKey: TThunk<
  {},
  {
    key: string;
  },
  ISettingGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`settings/${extra.key}`);
};

export const updateSetting: TThunk<
  {
    status: string;
    type: string;
  },
  {
    settingId: string;
  },
  ISettingStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`settings/${extra.settingId}`, formData);
};

export const deleteSetting: TThunk<
  {},
  {
    settingId: string;
  },
  ISettingDeleteResponse
> = (api, data, extra) => {
  return api.delete(`settings/${extra.settingId}`);
};

export const updateSettingStatus: TThunk<
  {
    status: string;
  },
  { settingId: string },
  ISettingStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`settings/${extra.settingId}/status`, formData);
};

export const updateSettingType: TThunk<
  {
    type: string;
  },
  { settingId: string },
  ISettingTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`settings/${extra.settingId}/type`, formData);
};

export const getSettingsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISettingsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "settings/trashed/list",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const restoreSetting: TThunk<
  {},
  {
    settingId: string;
  },
  ISettingRestoreResponse
> = (api, data, extra) => {
  return api.patch(`settings/${extra.settingId}/restore`);
};

export const forceDeleteSetting: TThunk<
  {},
  {
    settingId: string;
  },
  ISettingForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`settings/${extra.settingId}/force`);
};

export const exportSettings: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
    trashed: boolean;
  },
  {
    type: ExportType;
  },
  ISettingsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`settings/export/${extra.type}`, {
    responseType: "blob",
    params: {
      page: data.page,
      per_page: data.per_page,
      status: data.status,
      type: data.type,
      created_from: data.created_from,
      created_to: data.created_to,
      trashed: data.trashed,
    },
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  let fileName = "settings.xlsx";
  const fileNameFromServer = response.headers["content-disposition"];

  if (fileNameFromServer) {
    const matchFileName = fileNameFromServer.match(/filename="?([^";]+)"?/);

    if (matchFileName && matchFileName[1]) {
      fileName = matchFileName[1];
    }
  }

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return response;
};

export const importSettings: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ISettingsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`settings/import/${extra.type}`, formData);
};
