import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IAccountStrategyDeleteResponse,
  IAccountStrategyGetByKeyResponse,
  IAccountStrategiesResponse,
  IAccountStrategyStoreResponse,
  IAccountStrategyStatusUpdateResponse,
  IAccountStrategyTypeUpdateResponse,
  IAccountStrategiesExportResponse,
  IAccountStrategiesImportResponse,
  IAccountStrategiesTrashedResponse,
  IAccountStrategyRestoreResponse,
  IAccountStrategyForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getAccountStrategies: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    strategy_slug?: string;
    account_id?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountStrategiesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "account_strategies",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            strategy_slug: data.strategy_slug,
            account_id: data.account_id,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeAccountStrategy: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IAccountStrategyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("account_strategies", formData);
};

export const getAccountStrategyByKey: TThunk<
  {},
  {
    key: string;
  },
  IAccountStrategyGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`account_strategies/${extra.key}`);
};

export const updateAccountStrategy: TThunk<
  {
    status: string;
    type: string;
  },
  {
    accountStrategyId: string;
  },
  IAccountStrategyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`account_strategies/${extra.accountStrategyId}`, formData);
};

export const deleteAccountStrategy: TThunk<
  {},
  {
    accountStrategyId: string;
  },
  IAccountStrategyDeleteResponse
> = (api, data, extra) => {
  return api.delete(`account_strategies/${extra.accountStrategyId}`);
};

export const updateAccountStrategyStatus: TThunk<
  {
    status: string;
  },
  { accountStrategyId: string },
  IAccountStrategyStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(
    `account_strategies/${extra.accountStrategyId}/status`,
    formData
  );
};

export const updateAccountStrategyType: TThunk<
  {
    type: string;
  },
  { accountStrategyId: string },
  IAccountStrategyTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(
    `account_strategies/${extra.accountStrategyId}/type`,
    formData
  );
};

export const getAccountStrategiesTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    strategy_slug?: string;
    account_id?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountStrategiesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "account_strategies/trashed/list",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            strategy_slug: data.strategy_slug,
            account_id: data.account_id,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const restoreAccountStrategy: TThunk<
  {},
  {
    accountStrategyId: string;
  },
  IAccountStrategyRestoreResponse
> = (api, data, extra) => {
  return api.patch(`account_strategies/${extra.accountStrategyId}/restore`);
};

export const forceDeleteAccountStrategy: TThunk<
  {},
  {
    accountStrategyId: string;
  },
  IAccountStrategyForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`account_strategies/${extra.accountStrategyId}/force`);
};

export const exportAccountStrategies: TThunk<
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
  IAccountStrategiesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`account_strategies/export/${extra.type}`, {
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

  let fileName = "account_strategies.xlsx";
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

export const importAccountStrategies: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IAccountStrategiesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`account_strategies/import/${extra.type}`, formData);
};
