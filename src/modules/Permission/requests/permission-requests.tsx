import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IPermissionDeleteResponse,
  IPermissionGetByKeyResponse,
  IPermissionsResponse,
  IPermissionStoreResponse,
  IPermissionStatusUpdateResponse,
  IPermissionTypeUpdateResponse,
  IPermissionsExportResponse,
  IPermissionsImportResponse,
  IPermissionsTrashedResponse,
  IPermissionRestoreResponse,
  IPermissionForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getPermissions: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IPermissionsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "permissions",
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

export const storePermission: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IPermissionStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("permissions", formData);
};

export const getPermissionByKey: TThunk<
  {},
  {
    key: string;
  },
  IPermissionGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`permissions/${extra.key}`);
};

export const updatePermission: TThunk<
  {
    status: string;
    type: string;
  },
  {
    permissionId: string;
  },
  IPermissionStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`permissions/${extra.permissionId}`, formData);
};

export const deletePermission: TThunk<
  {},
  {
    permissionId: string;
  },
  IPermissionDeleteResponse
> = (api, data, extra) => {
  return api.delete(`permissions/${extra.permissionId}`);
};

export const updatePermissionStatus: TThunk<
  {
    status: string;
  },
  { permissionId: string },
  IPermissionStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`permissions/${extra.permissionId}/status`, formData);
};

export const updatePermissionType: TThunk<
  {
    type: string;
  },
  { permissionId: string },
  IPermissionTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`permissions/${extra.permissionId}/type`, formData);
};

export const getPermissionsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IPermissionsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "permissions/trashed/list",
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

export const restorePermission: TThunk<
  {},
  {
    permissionId: string;
  },
  IPermissionRestoreResponse
> = (api, data, extra) => {
  return api.patch(`permissions/${extra.permissionId}/restore`);
};

export const forceDeletePermission: TThunk<
  {},
  {
    permissionId: string;
  },
  IPermissionForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`permissions/${extra.permissionId}/force`);
};

export const exportPermissions: TThunk<
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
  IPermissionsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`permissions/export/${extra.type}`, {
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

  let fileName = "permissions.xlsx";
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

export const importPermissions: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IPermissionsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`permissions/import/${extra.type}`, formData);
};
