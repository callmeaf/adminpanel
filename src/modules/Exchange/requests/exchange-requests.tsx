import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IExchangeDeleteResponse,
  IExchangeGetByKeyResponse,
  IExchangesResponse,
  IExchangeStoreResponse,
  IExchangePasswordUpdateResponse,
  IExchangeStatusUpdateResponse,
  IExchangeTypeUpdateResponse,
  IExchangesExportResponse,
  IExchangesImportResponse,
  IExchangesTrashedResponse,
  IExchangeRestoreResponse,
  IExchangeForceDeleteResponse,
  IExchangeSyncCoinsResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getExchanges: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    name?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IExchangesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "exchanges",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            name: data.name,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeExchange: TThunk<
  {
    status: string;
    type: string;
    name: string;
    site_url: string;
    api_url: string;
    maker_fee_percent: string;
    taker_fee_percent: string;
    content: string;
  },
  {},
  IExchangeStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("name", data.name);
  formData.append("site_url", data.site_url);
  formData.append("api_url", data.api_url);
  formData.append("maker_fee_percent", data.maker_fee_percent);
  formData.append("taker_fee_percent", data.taker_fee_percent);
  formData.append("content", data.content);

  return api.post("exchanges", formData);
};

export const getExchangeByKey: TThunk<
  {},
  {
    key: string;
  },
  IExchangeGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`exchanges/${extra.key}`);
};

export const updateExchange: TThunk<
  {
    status: string;
    type: string;
    name: string;
    site_url: string;
    api_url: string;
    maker_fee_percent: string;
    taker_fee_percent: string;
    content: string;
  },
  {
    exchangeId: string;
  },
  IExchangeStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("name", data.name);
  formData.append("site_url", data.site_url);
  formData.append("api_url", data.api_url);
  formData.append("maker_fee_percent", data.maker_fee_percent);
  formData.append("taker_fee_percent", data.taker_fee_percent);
  formData.append("content", data.content);

  return api.post(`exchanges/${extra.exchangeId}`, formData);
};

export const deleteExchange: TThunk<
  {},
  {
    exchangeId: string;
  },
  IExchangeDeleteResponse
> = (api, data, extra) => {
  return api.delete(`exchanges/${extra.exchangeId}`);
};

export const updateExchangeStatus: TThunk<
  {
    status: string;
  },
  { exchangeId: string },
  IExchangeStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`exchanges/${extra.exchangeId}/status`, formData);
};

export const updateExchangeType: TThunk<
  {
    type: string;
  },
  { exchangeId: string },
  IExchangeTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`exchanges/${extra.exchangeId}/type`, formData);
};

export const getExchangesTrashed: TThunk<
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
  IExchangesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "exchanges/trashed/list",
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

export const restoreExchange: TThunk<
  {},
  {
    exchangeId: string;
  },
  IExchangeRestoreResponse
> = (api, data, extra) => {
  return api.patch(`exchanges/${extra.exchangeId}/restore`);
};

export const forceDeleteExchange: TThunk<
  {},
  {
    exchangeId: string;
  },
  IExchangeForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`exchanges/${extra.exchangeId}/force`);
};

export const exportExchanges: TThunk<
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
  IExchangesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`exchanges/export/${extra.type}`, {
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

  let fileName = "exchanges.xlsx";
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

export const importExchanges: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IExchangesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`exchanges/import/${extra.type}`, formData);
};

export const syncExchangeCoins: TThunk<
  {
    coins_symbols: string[];
  },
  {
    exchangeId: string;
  },
  IExchangeSyncCoinsResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");

  data.coins_symbols.forEach((coinSymbol) => {
    formData.append("coins_symbols[]", coinSymbol);
  });

  return api.post(`exchanges/${extra.exchangeId}/coins`, formData);
};
