import { TThunk } from "@/modules/Base/interfaces/request-interface";
import {
  IProductCategoryDeleteResponse,
  IProductCategoryGetByKeyResponse,
  IProductCategoriesResponse,
  IProductCategoryStoreResponse,
  IProductCategoryStatusUpdateResponse,
  IProductCategoryTypeUpdateResponse,
  IProductCategoriesExportResponse,
  IProductCategoriesImportResponse,
  IProductCategoriesTrashedResponse,
  IProductCategoryRestoreResponse,
  IProductCategoryForceDeleteResponse,
} from "../interfaces/request-interface";
import { ExportType } from "@/modules/Base/components/tables/TableExport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

export const getProductCategories: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IProductCategoriesResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "product_categories",
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

export const storeProductCategory: TThunk<
  {
    status: string;
    type: string;
  },
  {},
  IProductCategoryStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post("product_categories", formData);
};

export const getProductCategoryByKey: TThunk<
  {},
  {
    key: string;
  },
  IProductCategoryGetByKeyResponse
> = async (api, data, extra) => {
  return api.get(`product_categories/${extra.key}`);
};

export const updateProductCategory: TThunk<
  {
    status: string;
    type: string;
  },
  {
    productCategoryId: string;
  },
  IProductCategoryStoreResponse
> = async (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);
  formData.append("type", data.type);

  return api.post(`product_categories/${extra.productCategoryId}`, formData);
};

export const deleteProductCategory: TThunk<
  {},
  {
    productCategoryId: string;
  },
  IProductCategoryDeleteResponse
> = (api, data, extra) => {
  return api.delete(`product_categories/${extra.productCategoryId}`);
};

export const updateProductCategoryStatus: TThunk<
  {
    status: string;
  },
  { productCategoryId: string },
  IProductCategoryStatusUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("status", data.status);

  return api.post(`product_categories/${extra.productCategoryId}/status`, formData);
};

export const updateProductCategoryType: TThunk<
  {
    type: string;
  },
  { productCategoryId: string },
  IProductCategoryTypeUpdateResponse
> = (api, data, extra) => {
  const formData = new FormData();
  formData.append("_method", "PATCH");
  formData.append("type", data.type);

  return api.post(`product_categories/${extra.productCategoryId}/type`, formData);
};

export const getProductCategoriesTrashed: TThunk<
  {
    page?: number;
    per_page?: number;
    status?: string;
    type?: string;
    created_from?: string;
    created_to?: string;
  },
  {},
  IProductCategoriesTrashedResponse[],
  true
> = (api, data, extra) => {
  return api.get(
    "product_categories/trashed/list",
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

export const restoreProductCategory: TThunk<
  {},
  {
    productCategoryId: string;
  },
  IProductCategoryRestoreResponse
> = (api, data, extra) => {
  return api.patch(`product_categories/${extra.productCategoryId}/restore`);
};

export const forceDeleteProductCategory: TThunk<
  {},
  {
    productCategoryId: string;
  },
  IProductCategoryForceDeleteResponse
> = (api, data, extra) => {
  return api.delete(`product_categories/${extra.productCategoryId}/force`);
};

export const exportProductCategories: TThunk<
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
  IProductCategoriesExportResponse
> = async (api, data, extra) => {
  const response = await api.get(`product_categories/export/${extra.type}`, {
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

  let fileName = "product_categories.xlsx";
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

export const importProductCategories: TThunk<
  {
    file: File;
  },
  {
    type: ImportType;
  },
  IProductCategoriesImportResponse
> = (api, data, extra) => {
  const formData = new FormData();

  formData.append("file", data.file);
  return api.post(`product_categories/import/${extra.type}`, formData);
};
