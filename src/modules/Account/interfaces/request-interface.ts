import {
  IDataResponse,
  IExporterResponse,
  IImporterResponse,
} from "@/modules/Base/interfaces/request-interface";

/**
 * =============================
 * Account
 * =============================
 */

export interface IAccountResponse extends IDataResponse {
  public_key: string;
  secret_key: string;
  user_email: string;
  exchange_slug: string;
  total_amount: string;
  options: {
    [key: string]: string;
  };
}

export interface IAccountStoreResponse extends IAccountResponse {}

export interface IAccountGetByKeyResponse extends IAccountResponse {}

export interface IAccountStatusUpdateResponse extends IAccountResponse {}

export interface IAccountTypeUpdateResponse extends IAccountResponse {}

export interface IAccountsResponse extends IAccountResponse {}

export interface IAccountsTrashedResponse extends IAccountResponse {}

export interface IAccountDeleteResponse extends IAccountResponse {}

export interface IAccountRestoreResponse extends IAccountResponse {}

export interface IAccountForceDeleteResponse extends IAccountResponse {}

export interface IAccountsExportResponse extends IExporterResponse {}

export interface IAccountsImportResponse extends IImporterResponse {}
