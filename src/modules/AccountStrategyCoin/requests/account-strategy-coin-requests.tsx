import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IAccountStrategyCoinDeleteResponse,
  IAccountStrategyCoinGetByKeyResponse,
  IAccountStrategyCoinsResponse,
  IAccountStrategyCoinStoreResponse,
  IAccountStrategyCoinStatusUpdateResponse,
  IAccountStrategyCoinTypeUpdateResponse,
  IAccountStrategyCoinsExportResponse,
  IAccountStrategyCoinsImportResponse,
  IAccountStrategyCoinsTrashedResponse,
  IAccountStrategyCoinRestoreResponse,
  IAccountStrategyCoinForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getAccountStrategyCoins: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountStrategyCoinsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "account_strategy_coins",
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

export const storeAccountStrategyCoin: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IAccountStrategyCoinStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("account_strategy_coins", formData);
};

export const getAccountStrategyCoinByKey: TThunk<
  {},
  {
    key: string;
  },
  IAccountStrategyCoinGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`account_strategy_coins/${extra.key}`);
};

export const updateAccountStrategyCoin: TThunk<
  {
    status: string;
    type: string;
  },
  {
    accountStrategyCoinId: string;
  },
  IAccountStrategyCoinStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`account_strategy_coins/${extra.accountStrategyCoinId}`, formData);
};

export const deleteAccountStrategyCoin: TThunk<
  {},
  {
    accountStrategyCoinId: string;
  },
  IAccountStrategyCoinDeleteResponse
> = (api, data, extra) => {
  return api.delete(`account_strategy_coins/${extra.accountStrategyCoinId}`);
};

export const updateAccountStrategyCoinStatus: TThunk<
  {
    status: string;
  },
  { accountStrategyCoinId: string },
  IAccountStrategyCoinStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`account_strategy_coins/${extra.accountStrategyCoinId}/status`, formData);
};

export const updateAccountStrategyCoinType: TThunk<
  {
    type: string;
  },
  { accountStrategyCoinId: string },
  IAccountStrategyCoinTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`account_strategy_coins/${extra.accountStrategyCoinId}/type`, formData);
};

export const getAccountStrategyCoinsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IAccountStrategyCoinsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "account_strategy_coins/trashed/list",
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

export const restoreAccountStrategyCoin: TThunk<
  {},
  {
    accountStrategyCoinId: string;
  },
  IAccountStrategyCoinRestoreResponse
> = (api, data, extra) => {
  return api.patch(`account_strategy_coins/${extra.accountStrategyCoinId}/restore`);
};

export const forceDeleteAccountStrategyCoin: TThunk<
  {},
  {
    accountStrategyCoinId: string;
  },
  IAccountStrategyCoinForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`account_strategy_coins/${extra.accountStrategyCoinId}/force`);
};

export const exportAccountStrategyCoins: TThunk<
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
  IAccountStrategyCoinsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`account_strategy_coins/export/${extra.type}`, {
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

  let fileName = "account_strategy_coins.xlsx";
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

export const importAccountStrategyCoins: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IAccountStrategyCoinsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`account_strategy_coins/import/${extra.type}`, formData);
};
