import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ICommentDeleteResponse,
  ICommentGetByKeyResponse,
  ICommentsResponse,
  ICommentStoreResponse,
  ICommentStatusUpdateResponse,
  ICommentTypeUpdateResponse,
  ICommentsExportResponse,
  ICommentsImportResponse,
  ICommentsTrashedResponse,
  ICommentRestoreResponse,
  ICommentForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getComments: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ICommentsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "comments",
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

export const storeComment: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  ICommentStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("comments", formData);
};

export const getCommentByKey: TThunk<
  {},
  {
    key: string;
  },
  ICommentGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`comments/${extra.key}`);
};

export const updateComment: TThunk<
  {
    status: string;
    type: string;
  },
  {
    commentId: string;
  },
  ICommentStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`comments/${extra.commentId}`, formData);
};

export const deleteComment: TThunk<
  {},
  {
    commentId: string;
  },
  ICommentDeleteResponse
> = (api, data, extra) => {
  return api.delete(`comments/${extra.commentId}`);
};

export const updateCommentStatus: TThunk<
  {
    status: string;
  },
  { commentId: string },
  ICommentStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`comments/${extra.commentId}/status`, formData);
};

export const updateCommentType: TThunk<
  {
    type: string;
  },
  { commentId: string },
  ICommentTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`comments/${extra.commentId}/type`, formData);
};

export const getCommentsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ICommentsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "comments/trashed/list",
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

export const restoreComment: TThunk<
  {},
  {
    commentId: string;
  },
  ICommentRestoreResponse
> = (api, data, extra) => {
  return api.patch(`comments/${extra.commentId}/restore`);
};

export const forceDeleteComment: TThunk<
  {},
  {
    commentId: string;
  },
  ICommentForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`comments/${extra.commentId}/force`);
};

export const exportComments: TThunk<
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
  ICommentsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`comments/export/${extra.type}`, {
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

  let fileName = "comments.xlsx";
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

export const importComments: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ICommentsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`comments/import/${extra.type}`, formData);
};
