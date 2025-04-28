import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IStrategyDeleteResponse,
  IStrategyGetByKeyResponse,
  IStrategiesResponse,
  IStrategyStoreResponse,
  IStrategyStatusUpdateResponse,
  IStrategyTypeUpdateResponse,
  IStrategiesExportResponse,
  IStrategiesImportResponse,
  IStrategiesTrashedResponse,
  IStrategyRestoreResponse,
  IStrategyForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getStrategies: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IStrategiesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "strategies",
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

export const storeStrategy: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IStrategyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("strategies", formData);
};

export const getStrategyByKey: TThunk<
  {},
  {
    key: string;
  },
  IStrategyGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`strategies/${extra.key}`);
};

export const updateStrategy: TThunk<
  {
    status: string;
    type: string;
  },
  {
    strategyId: string;
  },
  IStrategyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`strategies/${extra.strategyId}`, formData);
};

export const deleteStrategy: TThunk<
  {},
  {
    strategyId: string;
  },
  IStrategyDeleteResponse
> = (api, data, extra) => {
  return api.delete(`strategies/${extra.strategyId}`);
};

export const updateStrategyStatus: TThunk<
  {
    status: string;
  },
  { strategyId: string },
  IStrategyStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`strategies/${extra.strategyId}/status`, formData);
};

export const updateStrategyType: TThunk<
  {
    type: string;
  },
  { strategyId: string },
  IStrategyTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`strategies/${extra.strategyId}/type`, formData);
};

export const getStrategiesTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IStrategiesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "strategies/trashed/list",
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

export const restoreStrategy: TThunk<
  {},
  {
    strategyId: string;
  },
  IStrategyRestoreResponse
> = (api, data, extra) => {
  return api.patch(`strategies/${extra.strategyId}/restore`);
};

export const forceDeleteStrategy: TThunk<
  {},
  {
    strategyId: string;
  },
  IStrategyForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`strategies/${extra.strategyId}/force`);
};

export const exportStrategies: TThunk<
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
  IStrategiesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`strategies/export/${extra.type}`, {
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

  let fileName = "strategies.xlsx";
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

export const importStrategies: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IStrategiesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`strategies/import/${extra.type}`, formData);
};
