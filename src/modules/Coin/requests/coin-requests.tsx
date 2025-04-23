import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ICoinDeleteResponse,
  ICoinGetByKeyResponse,
  ICoinsResponse,
  ICoinStoreResponse,
  ICoinStatusUpdateResponse,
  ICoinTypeUpdateResponse,
  ICoinsExportResponse,
  ICoinsImportResponse,
  ICoinsTrashedResponse,
  ICoinRestoreResponse,
  ICoinForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getCoins: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    symbol?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ICoinsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "coins",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            symbol: data.symbol,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeCoin: TThunk<
  {
    status: string;
    type: string;
    symbol: string;
  },
  {},
  ICoinStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("symbol", data.symbol);

  return api.post("coins", formData);
};

export const getCoinByKey: TThunk<
  {},
  {
    key: string;
  },
  ICoinGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`coins/${extra.key}`);
};

export const updateCoin: TThunk<
  {
    status: string;
    type: string;
    symbol: string;
  },
  {
    coinId: string;
  },
  ICoinStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("symbol", data.symbol);

  return api.post(`coins/${extra.coinId}`, formData);
};

export const deleteCoin: TThunk<
  {},
  {
    coinId: string;
  },
  ICoinDeleteResponse
> = (api, data, extra) => {
  return api.delete(`coins/${extra.coinId}`);
};

export const updateCoinStatus: TThunk<
  {
    status: string;
  },
  { coinId: string },
  ICoinStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`coins/${extra.coinId}/status`, formData);
};

export const updateCoinType: TThunk<
  {
    type: string;
  },
  { coinId: string },
  ICoinTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`coins/${extra.coinId}/type`, formData);
};

export const getCoinsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    symbol?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ICoinsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "coins/trashed/list",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            symbol: data.symbol,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const restoreCoin: TThunk<
  {},
  {
    coinId: string;
  },
  ICoinRestoreResponse
> = (api, data, extra) => {
  return api.patch(`coins/${extra.coinId}/restore`);
};

export const forceDeleteCoin: TThunk<
  {},
  {
    coinId: string;
  },
  ICoinForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`coins/${extra.coinId}/force`);
};

export const exportCoins: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    symbol?: string;
    created_from?: string;
    created_to?: string;
    trashed: boolean;
  },
  {
    type: ExportType;
  },
  ICoinsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`coins/export/${extra.type}`, {
    responseType: "blob",
    params: {
      page: data.page,
      per_page: data.per_page,
      status: data.status,
      type: data.type,
      symbol: data.symbol,
      created_from: data.created_from,
      created_to: data.created_to,
      trashed: data.trashed,
    },
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  let fileName = "coins.xlsx";
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

export const importCoins: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ICoinsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`coins/import/${extra.type}`, formData);
};
