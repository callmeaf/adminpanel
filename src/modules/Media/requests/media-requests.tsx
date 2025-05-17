import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IMediaDeleteResponse,
  IMediaGetByKeyResponse,
  IMediaResponse,
  IMediaStoreResponse,
  IMediaStatusUpdateResponse,
  IMediaTypeUpdateResponse,
  IMediaExportResponse,
  IMediaImportResponse,
  IMediaTrashedResponse,
  IMediaRestoreResponse,
  IMediaForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getMedia: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IMediaResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "media",
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

export const storeMedia: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IMediaStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("media", formData);
};

export const getMediaByKey: TThunk<
  {},
  {
    key: string;
  },
  IMediaGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`media/${extra.key}`);
};

export const updateMedia: TThunk<
  {
    status: string;
    type: string;
  },
  {
    mediaId: string;
  },
  IMediaStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`media/${extra.mediaId}`, formData);
};

export const deleteMedia: TThunk<
  {},
  {
    mediaId: string;
  },
  IMediaDeleteResponse
> = (api, data, extra) => {
  return api.delete(`media/${extra.mediaId}`);
};

export const updateMediaStatus: TThunk<
  {
    status: string;
  },
  { mediaId: string },
  IMediaStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`media/${extra.mediaId}/status`, formData);
};

export const updateMediaType: TThunk<
  {
    type: string;
  },
  { mediaId: string },
  IMediaTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`media/${extra.mediaId}/type`, formData);
};

export const getMediaTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IMediaTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "media/trashed/list",
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

export const restoreMedia: TThunk<
  {},
  {
    mediaId: string;
  },
  IMediaRestoreResponse
> = (api, data, extra) => {
  return api.patch(`media/${extra.mediaId}/restore`);
};

export const forceDeleteMedia: TThunk<
  {},
  {
    mediaId: string;
  },
  IMediaForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`media/${extra.mediaId}/force`);
};

export const exportMedia: TThunk<
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
  IMediaExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`media/export/${extra.type}`, {
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

  let fileName = "media.xlsx";
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

export const importMedia: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IMediaImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`media/import/${extra.type}`, formData);
};
