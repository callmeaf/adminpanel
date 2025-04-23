import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * ProductCategory
 * =============================
 */

export interface IProductCategoryResponse extends IDataResponse {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
}

export interface IProductCategoryStoreResponse extends IProductCategoryResponse {}

export interface IProductCategoryGetByKeyResponse extends IProductCategoryResponse {}

export interface IProductCategoryPasswordUpdateResponse extends IProductCategoryResponse {}

export interface IProductCategoryStatusUpdateResponse extends IProductCategoryResponse {}

export interface IProductCategoryTypeUpdateResponse extends IProductCategoryResponse {}

export interface IProductCategoriesResponse extends IProductCategoryResponse {}

export interface IProductCategoriesTrashedResponse extends IProductCategoryResponse {}

export interface IProductCategoryDeleteResponse extends IProductCategoryResponse {}

export interface IProductCategoryRestoreResponse extends IProductCategoryResponse {}

export interface IProductCategoryForceDeleteResponse extends IProductCategoryResponse {}

export interface IProductCategoriesExportResponse extends IExporterResponse {}

export interface IProductCategoriesImportResponse extends IImporterResponse {}
