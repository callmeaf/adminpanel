import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ITicketDeleteResponse,
  ITicketGetByKeyResponse,
  ITicketsResponse,
  ITicketStoreResponse,
  ITicketStatusUpdateResponse,
  ITicketTypeUpdateResponse,
  ITicketsExportResponse,
  ITicketsImportResponse,
  ITicketsTrashedResponse,
  ITicketRestoreResponse,
  ITicketForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getTickets: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    subject?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ITicketsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "tickets",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            status: data.status,
            type: data.type,
            subject: data.subject,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeTicket: TThunk<
  {
    status: string;
    type: string;
    subject: string;
    title: string;
    content: string;
    attachments?: File[];
  },
  {},
  ITicketStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  // formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("subject", data.subject);
  formData.append("title", data.title);
  formData.append("content", data.content);
  data.attachments?.forEach((attachment) => {
    formData.append("attachments[]", attachment, attachment.name);
  });

  return api.post("tickets", formData);
};

export const getTicketByKey: TThunk<
  {},
  {
    key: string;
  },
  ITicketGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`tickets/${extra.key}`);
};

export const updateTicket: TThunk<
  {
    status: string;
    type: string;
  },
  {
    ticketId: string;
  },
  ITicketStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`tickets/${extra.ticketId}`, formData);
};

export const deleteTicket: TThunk<
  {},
  {
    ticketId: string;
  },
  ITicketDeleteResponse
> = (api, data, extra) => {
  return api.delete(`tickets/${extra.ticketId}`);
};

export const updateTicketStatus: TThunk<
  {
    status: string;
  },
  { ticketId: string },
  ITicketStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`tickets/${extra.ticketId}/status`, formData);
};

export const updateTicketType: TThunk<
  {
    type: string;
  },
  { ticketId: string },
  ITicketTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`tickets/${extra.ticketId}/type`, formData);
};

export const getTicketsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ITicketsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "tickets/trashed/list",
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

export const restoreTicket: TThunk<
  {},
  {
    ticketId: string;
  },
  ITicketRestoreResponse
> = (api, data, extra) => {
  return api.patch(`tickets/${extra.ticketId}/restore`);
};

export const forceDeleteTicket: TThunk<
  {},
  {
    ticketId: string;
  },
  ITicketForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`tickets/${extra.ticketId}/force`);
};

export const exportTickets: TThunk<
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
  ITicketsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`tickets/export/${extra.type}`, {
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

  let fileName = "tickets.xlsx";
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

export const importTickets: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ITicketsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`tickets/import/${extra.type}`, formData);
};
