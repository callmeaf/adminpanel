import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IAccountDeleteResponse,
  IAccountGetByKeyResponse,
  IAccountsResponse,
  IAccountStoreResponse,
  IAccountStatusUpdateResponse,
  IAccountTypeUpdateResponse,
  IAccountsExportResponse,
  IAccountsImportResponse,
  IAccountsTrashedResponse,
  IAccountRestoreResponse,
  IAccountForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getAccounts: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "accounts",
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

export const storeAccount: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IAccountStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("accounts", formData);
};

export const getAccountByKey: TThunk<
  {},
  {
    key: string;
  },
  IAccountGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`accounts/${extra.key}`);
};

export const updateAccount: TThunk<
  {
    status: string;
    type: string;
  },
  {
    accountId: string;
  },
  IAccountStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`accounts/${extra.accountId}`, formData);
};

export const deleteAccount: TThunk<
  {},
  {
    accountId: string;
  },
  IAccountDeleteResponse
> = (api, data, extra) => {
  return api.delete(`accounts/${extra.accountId}`);
};

export const updateAccountStatus: TThunk<
  {
    status: string;
  },
  { accountId: string },
  IAccountStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`accounts/${extra.accountId}/status`, formData);
};

export const updateAccountType: TThunk<
  {
    type: string;
  },
  { accountId: string },
  IAccountTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`accounts/${extra.accountId}/type`, formData);
};

export const getAccountsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "accounts/trashed/list",
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

export const restoreAccount: TThunk<
  {},
  {
    accountId: string;
  },
  IAccountRestoreResponse
> = (api, data, extra) => {
  return api.patch(`accounts/${extra.accountId}/restore`);
};

export const forceDeleteAccount: TThunk<
  {},
  {
    accountId: string;
  },
  IAccountForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`accounts/${extra.accountId}/force`);
};

export const exportAccounts: TThunk<
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
  IAccountsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`accounts/export/${extra.type}`, {
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

  let fileName = "accounts.xlsx";
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

export const importAccounts: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IAccountsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`accounts/import/${extra.type}`, formData);
};
