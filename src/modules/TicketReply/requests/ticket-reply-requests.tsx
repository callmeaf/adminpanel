import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ITicketReplyDeleteResponse,
  ITicketReplyGetByKeyResponse,
  ITicketRepliesResponse,
  ITicketReplyStoreResponse,
  ITicketReplyStatusUpdateResponse,
  ITicketReplyTypeUpdateResponse,
  ITicketRepliesExportResponse,
  ITicketRepliesImportResponse,
  ITicketRepliesTrashedResponse,
  ITicketReplyRestoreResponse,
  ITicketReplyForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getTicketReplies: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ITicketRepliesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "ticket_replies",
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

export const storeTicketReply: TThunk<
  {
    status: string;
    type: string;
    ticket_ref_code: string;
    content?: string;
    attachments?: File[];
  },
  {},
  ITicketReplyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  // formData.append("status", data.status);
  // formData.append("type", data.type);
  formData.append("ticket_ref_code", data.ticket_ref_code);
  if (data.content) {
    formData.append("content", data.content);
  }

  data.attachments?.forEach((attachment) => {
    formData.append("attachments[]", attachment, attachment.name);
  });

  return api.post("ticket_replies", formData);
};

export const getTicketReplyByKey: TThunk<
  {},
  {
    key: string;
  },
  ITicketReplyGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`ticket_replies/${extra.key}`);
};

export const updateTicketReply: TThunk<
  {
    status: string;
    type: string;
  },
  {
    ticketReplyId: string;
  },
  ITicketReplyStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`ticket_replies/${extra.ticketReplyId}`, formData);
};

export const deleteTicketReply: TThunk<
  {},
  {
    ticketReplyId: string;
  },
  ITicketReplyDeleteResponse
> = (api, data, extra) => {
  return api.delete(`ticket_replies/${extra.ticketReplyId}`);
};

export const updateTicketReplyStatus: TThunk<
  {
    status: string;
  },
  { ticketReplyId: string },
  ITicketReplyStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`ticket_replies/${extra.ticketReplyId}/status`, formData);
};

export const updateTicketReplyType: TThunk<
  {
    type: string;
  },
  { ticketReplyId: string },
  ITicketReplyTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`ticket_replies/${extra.ticketReplyId}/type`, formData);
};

export const getTicketRepliesTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ITicketRepliesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "ticket_replies/trashed/list",
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

export const restoreTicketReply: TThunk<
  {},
  {
    ticketReplyId: string;
  },
  ITicketReplyRestoreResponse
> = (api, data, extra) => {
  return api.patch(`ticket_replies/${extra.ticketReplyId}/restore`);
};

export const forceDeleteTicketReply: TThunk<
  {},
  {
    ticketReplyId: string;
  },
  ITicketReplyForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`ticket_replies/${extra.ticketReplyId}/force`);
};

export const exportTicketReplies: TThunk<
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
  ITicketRepliesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`ticket_replies/export/${extra.type}`, {
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

  let fileName = "ticket_replies.xlsx";
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

export const importTicketReplies: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ITicketRepliesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`ticket_replies/import/${extra.type}`, formData);
};
