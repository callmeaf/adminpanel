import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IVersionDeleteResponse,
  IVersionGetByKeyResponse,
  IVersionsResponse,
  IVersionStoreResponse,
  IVersionStatusUpdateResponse,
  IVersionTypeUpdateResponse,
  IVersionsExportResponse,
  IVersionsImportResponse,
  IVersionsTrashedResponse,
  IVersionRestoreResponse,
  IVersionForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getVersions: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    id?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IVersionsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "versions",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            id: data.id,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeVersion: TThunk<
  {
    status: string;
    type: string;
    id: string;
    content: string;
  },
  {},
  IVersionStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  // formData.append("status", data.status);
  // formData.append("type", data.type);
  formData.append("id", data.id);
  formData.append("content", data.content);

  return api.post("versions", formData);
};

export const getVersionByKey: TThunk<
  {},
  {
    key: string;
  },
  IVersionGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`versions/${extra.key}`);
};

export const updateVersion: TThunk<
  {
    status: string;
    type: string;
    content: string;
    id: string;
  },
  {
    versionId: string;
  },
  IVersionStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  // formData.append("status", data.status);
  // formData.append("type", data.type);
  formData.append("id", data.id);
  formData.append("content", data.content);

  return api.post(`versions/${extra.versionId}`, formData);
};

export const deleteVersion: TThunk<
  {},
  {
    versionId: string;
  },
  IVersionDeleteResponse
> = (api, data, extra) => {
  return api.delete(`versions/${extra.versionId}`);
};

export const updateVersionStatus: TThunk<
  {
    status: string;
  },
  { versionId: string },
  IVersionStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`versions/${extra.versionId}/status`, formData);
};

export const updateVersionType: TThunk<
  {
    type: string;
  },
  { versionId: string },
  IVersionTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`versions/${extra.versionId}/type`, formData);
};

export const getVersionsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IVersionsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "versions/trashed/list",
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

export const restoreVersion: TThunk<
  {},
  {
    versionId: string;
  },
  IVersionRestoreResponse
> = (api, data, extra) => {
  return api.patch(`versions/${extra.versionId}/restore`);
};

export const forceDeleteVersion: TThunk<
  {},
  {
    versionId: string;
  },
  IVersionForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`versions/${extra.versionId}/force`);
};

export const exportVersions: TThunk<
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
  IVersionsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`versions/export/${extra.type}`, {
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

  let fileName = "versions.xlsx";
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

export const importVersions: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IVersionsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`versions/import/${extra.type}`, formData);
};
