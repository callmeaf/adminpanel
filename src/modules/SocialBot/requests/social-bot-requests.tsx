import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ISocialBotDeleteResponse,
  ISocialBotGetByKeyResponse,
  ISocialBotsResponse,
  ISocialBotStoreResponse,
  ISocialBotStatusUpdateResponse,
  ISocialBotTypeUpdateResponse,
  ISocialBotsExportResponse,
  ISocialBotsImportResponse,
  ISocialBotsTrashedResponse,
  ISocialBotRestoreResponse,
  ISocialBotForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getSocialBots: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISocialBotsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "social_bots",
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

export const storeSocialBot: TThunk<
  {
    status: string;
    type: string;
    social_id: string;
    name: string;
    token: string;
    footer: string;
  },
  {},
  ISocialBotStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("social_id", data.social_id);
  formData.append("name", data.name);
  formData.append("token", data.token);
  formData.append("footer", data.footer);

  return api.post("social_bots", formData);
};

export const getSocialBotByKey: TThunk<
  {},
  {
    key: string;
  },
  ISocialBotGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`social_bots/${extra.key}`);
};

export const updateSocialBot: TThunk<
  {
    status: string;
    type: string;
    social_id: string;
    name: string;
    token: string;
    footer: string;
  },
  {
    socialBotId: string;
  },
  ISocialBotStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("social_id", data.social_id);
  formData.append("name", data.name);
  formData.append("token", data.token);
  formData.append("footer", data.footer);

  return api.post(`social_bots/${extra.socialBotId}`, formData);
};

export const deleteSocialBot: TThunk<
  {},
  {
    socialBotId: string;
  },
  ISocialBotDeleteResponse
> = (api, data, extra) => {
  return api.delete(`social_bots/${extra.socialBotId}`);
};

export const updateSocialBotStatus: TThunk<
  {
    status: string;
  },
  { socialBotId: string },
  ISocialBotStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`social_bots/${extra.socialBotId}/status`, formData);
};

export const updateSocialBotType: TThunk<
  {
    type: string;
  },
  { socialBotId: string },
  ISocialBotTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`social_bots/${extra.socialBotId}/type`, formData);
};

export const getSocialBotsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISocialBotsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "social_bots/trashed/list",
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

export const restoreSocialBot: TThunk<
  {},
  {
    socialBotId: string;
  },
  ISocialBotRestoreResponse
> = (api, data, extra) => {
  return api.patch(`social_bots/${extra.socialBotId}/restore`);
};

export const forceDeleteSocialBot: TThunk<
  {},
  {
    socialBotId: string;
  },
  ISocialBotForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`social_bots/${extra.socialBotId}/force`);
};

export const exportSocialBots: TThunk<
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
  ISocialBotsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`social_bots/export/${extra.type}`, {
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

  let fileName = "social_bots.xlsx";
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

export const importSocialBots: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ISocialBotsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`social_bots/import/${extra.type}`, formData);
};
