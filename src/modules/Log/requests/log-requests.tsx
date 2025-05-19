import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ILogDeleteResponse,
  ILogGetByKeyResponse,
  ILogsResponse,
  ILogStoreResponse,
  ILogStatusUpdateResponse,
  ILogTypeUpdateResponse,
  ILogsExportResponse,
  ILogsImportResponse,
  ILogsTrashedResponse,
  ILogRestoreResponse,
  ILogForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getLogs: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    causer_id?: string;
    causer_type?: string;
    subject_id?: string;
    subject_type?: string;
    event?: string;
    log_name?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ILogsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "logs",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            causer_id: data.causer_id,
            causer_type: data.causer_type,
            subject_id: data.subject_id,
            subject_type: data.subject_type,
            event: data.event,
            log_name: data.log_name,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeLog: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  ILogStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("logs", formData);
};

export const getLogByKey: TThunk<
  {},
  {
    key: string;
  },
  ILogGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`logs/${extra.key}`);
};

export const updateLog: TThunk<
  {
    status: string;
    type: string;
  },
  {
    logId: string;
  },
  ILogStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`logs/${extra.logId}`, formData);
};

export const deleteLog: TThunk<
  {},
  {
    logId: string;
  },
  ILogDeleteResponse
> = (api, data, extra) => {
  return api.delete(`logs/${extra.logId}`);
};

export const updateLogStatus: TThunk<
  {
    status: string;
  },
  { logId: string },
  ILogStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`logs/${extra.logId}/status`, formData);
};

export const updateLogType: TThunk<
  {
    type: string;
  },
  { logId: string },
  ILogTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`logs/${extra.logId}/type`, formData);
};

export const getLogsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ILogsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "logs/trashed/list",
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

export const restoreLog: TThunk<
  {},
  {
    logId: string;
  },
  ILogRestoreResponse
> = (api, data, extra) => {
  return api.patch(`logs/${extra.logId}/restore`);
};

export const forceDeleteLog: TThunk<
  {},
  {
    logId: string;
  },
  ILogForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`logs/${extra.logId}/force`);
};

export const exportLogs: TThunk<
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
  ILogsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`logs/export/${extra.type}`, {
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

  let fileName = "logs.xlsx";
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

export const importLogs: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ILogsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`logs/import/${extra.type}`, formData);
};
