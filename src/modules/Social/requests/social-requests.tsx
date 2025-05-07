import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  ISocialDeleteResponse,
  ISocialGetByKeyResponse,
  ISocialsResponse,
  ISocialStoreResponse,
  ISocialStatusUpdateResponse,
  ISocialTypeUpdateResponse,
  ISocialsExportResponse,
  ISocialsImportResponse,
  ISocialsTrashedResponse,
  ISocialRestoreResponse,
  ISocialForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getSocials: TThunk<
  {
    page?: number;
    per_page?: number;
    chat_id?: string;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISocialsResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "socials",
    data
      ? {
          params: {
            page: data.page,
            per_page: data.per_page,
            chat_id: data.chat_id,
            status: data.status,
            type: data.type,
            created_from: data.created_from,
            created_to: data.created_to,
          },
        }
      : {}
  );
};

export const storeSocial: TThunk<
  {
    status: string;
    type: string;
    chat_id: string;
  },
  {},
  ISocialStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("chat_id", data.chat_id);

  return api.post("socials", formData);
};

export const getSocialByKey: TThunk<
  {},
  {
    key: string;
  },
  ISocialGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`socials/${extra.key}`);
};

export const updateSocial: TThunk<
  {
    status: string;
    type: string;
    chat_id: string;
  },
  {
    socialId: string;
  },
  ISocialStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);
  formData.append("chat_id", data.chat_id);

  return api.post(`socials/${extra.socialId}`, formData);
};

export const deleteSocial: TThunk<
  {},
  {
    socialId: string;
  },
  ISocialDeleteResponse
> = (api, data, extra) => {
  return api.delete(`socials/${extra.socialId}`);
};

export const updateSocialStatus: TThunk<
  {
    status: string;
  },
  { socialId: string },
  ISocialStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`socials/${extra.socialId}/status`, formData);
};

export const updateSocialType: TThunk<
  {
    type: string;
  },
  { socialId: string },
  ISocialTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`socials/${extra.socialId}/type`, formData);
};

export const getSocialsTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  ISocialsTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "socials/trashed/list",
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

export const restoreSocial: TThunk<
  {},
  {
    socialId: string;
  },
  ISocialRestoreResponse
> = (api, data, extra) => {
  return api.patch(`socials/${extra.socialId}/restore`);
};

export const forceDeleteSocial: TThunk<
  {},
  {
    socialId: string;
  },
  ISocialForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`socials/${extra.socialId}/force`);
};

export const exportSocials: TThunk<
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
  ISocialsExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`socials/export/${extra.type}`, {
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

  let fileName = "socials.xlsx";
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

export const importSocials: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  ISocialsImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`socials/import/${extra.type}`, formData);
};
