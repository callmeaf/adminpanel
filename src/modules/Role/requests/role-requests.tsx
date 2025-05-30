import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IRoleDeleteResponse,
  IRoleGetByKeyResponse,
  IRolesResponse,
  IRoleStoreResponse,
  IRoleStatusUpdateResponse,
  IRoleTypeUpdateResponse,
  IRolesExportResponse,
  IRolesImportResponse,
  IRolesTrashedResponse,
  IRoleRestoreResponse,
  IRoleForceDeleteResponse,
  IRoleSyncPermissionsResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getRoles: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    name?: string;
    name_fa?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IRolesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "roles",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            name: data.name,
            name_fa: data.name_fa,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeRole: TThunk<
  {
    status: string;
    type: string;
    name: string;
    name_fa: string;
  },
  {},
  IRoleStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("name", data.name);
  formData.append("name_fa", data.name_fa);

  return api.post("roles", formData);
};

export const getRoleByKey: TThunk<
  {},
  {
    key: string;
  },
  IRoleGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`roles/${extra.key}`);
};

export const updateRole: TThunk<
  {
    status: string;
    type: string;
    name: string;
    name_fa: string;
  },
  {
    roleId: string;
  },
  IRoleStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("name", data.name);
  formData.append("name_fa", data.name_fa);

  return api.post(`roles/${extra.roleId}`, formData);
};

export const deleteRole: TThunk<
  {},
  {
    roleId: string;
  },
  IRoleDeleteResponse
> = (api, data, extra) => {
  return api.delete(`roles/${extra.roleId}`);
};

export const updateRoleStatus: TThunk<
  {
    status: string;
  },
  { roleId: string },
  IRoleStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`roles/${extra.roleId}/status`, formData);
};

export const updateRoleType: TThunk<
  {
    type: string;
  },
  { roleId: string },
  IRoleTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`roles/${extra.roleId}/type`, formData);
};

export const getRolesTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IRolesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "roles/trashed/list",
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

export const restoreRole: TThunk<
  {},
  {
    roleId: string;
  },
  IRoleRestoreResponse
> = (api, data, extra) => {
  return api.patch(`roles/${extra.roleId}/restore`);
};

export const forceDeleteRole: TThunk<
  {},
  {
    roleId: string;
  },
  IRoleForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`roles/${extra.roleId}/force`);
};

export const exportRoles: TThunk<
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
  IRolesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`roles/export/${extra.type}`, {
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

  let fileName = "roles.xlsx";
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

export const importRoles: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IRolesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`roles/import/${extra.type}`, formData);
};

export const syncRolePermissions: TThunk<
  {
    permissions_ids: string[];
  },
  {
    roleId: string;
  },
  IRoleSyncPermissionsResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");

  data.permissions_ids.forEach((permissionId) => {
    formData.append("permissions_ids[]", permissionId);
  });

  return api.post(`roles/${extra.roleId}/permissions`, formData);
};
