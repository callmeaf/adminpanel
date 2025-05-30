import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IUserDeleteResponse,
  IUserGetByKeyResponse,
  IUsersResponse,
  IUserStoreResponse,
  IUserPasswordUpdateResponse,
  IUserStatusUpdateResponse,
  IUserTypeUpdateResponse,
  IUsersExportResponse,
  IUsersImportResponse,
  IUsersTrashedResponse,
  IUserRestoreResponse,
  IUserForceDeleteResponse,
  IUserSyncRolesResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getUsers: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    email?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IUsersResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "users",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeUser: TThunk<
  {
    status: string;
    type: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
  },
  {},
  IUserStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("mobile", data.mobile);
  formData.append("email", data.email);

  return api.post("users", formData);
};

export const getUserByKey: TThunk<
  {},
  {
    key: string;
  },
  IUserGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`users/${extra.key}`);
};

export const updateUser: TThunk<
  {
    status: string;
    type: string;
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
  },
  {
    userId: string;
  },
  IUserStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("mobile", data.mobile);
  formData.append("email", data.email);

  return api.post(`users/${extra.userId}`, formData);
};

export const updateUserPassword: TThunk<
  {
    password: string;
    password_confirmation: string;
  },
  {
    userId: string;
  },
  IUserPasswordUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  return api.post(`users/${extra.userId}/password`, formData);
};

export const deleteUser: TThunk<
  {},
  {
    userId: string;
  },
  IUserDeleteResponse
> = (api, data, extra) => {
  return api.delete(`users/${extra.userId}`);
};

export const updateUserStatus: TThunk<
  {
    status: string;
  },
  { userId: string },
  IUserStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`users/${extra.userId}/status`, formData);
};

export const updateUserType: TThunk<
  {
    type: string;
  },
  { userId: string },
  IUserTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`users/${extra.userId}/type`, formData);
};

export const getUsersTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    email?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IUsersTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "users/trashed/list",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const restoreUser: TThunk<
  {},
  {
    userId: string;
  },
  IUserRestoreResponse
> = (api, data, extra) => {
  return api.patch(`users/${extra.userId}/restore`);
};

export const forceDeleteUser: TThunk<
  {},
  {
    userId: string;
  },
  IUserForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`users/${extra.userId}/force`);
};

export const exportUsers: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    email?: string;
    created_from?: string;
    created_to?: string;
    trashed: boolean;
  },
  {
    type: ExportType;
  },
  IUsersExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`users/export/${extra.type}`, {
    responseType: "blob",
    params: {
      page: data.page,
      per_page: data.per_page,
      status: data.status,
      type: data.type,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile: data.mobile,
      email: data.email,
      created_from: data.created_from,
      created_to: data.created_to,
      trashed: data.trashed,
    },
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  let fileName = "users.xlsx";
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

export const importUsers: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IUsersImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`users/import/${extra.type}`, formData);
};

export const syncUserRoles: TThunk<
  {
    roles_ids: string[];
  },
  {
    userId: string;
  },
  IUserSyncRolesResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");

  data.roles_ids.forEach((roleId) => {
    formData.append("roles_ids[]", roleId);
  });

  return api.post(`users/${extra.userId}/roles`, formData);
};
