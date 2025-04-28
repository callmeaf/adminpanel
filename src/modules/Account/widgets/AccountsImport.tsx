import * as React from "react";
import ImportWrapper, {
  ImportRowType,
  ImportType,
  TErrorGroup,
  TOnExportSampleFile,
  TOnFileUpload,
} from "@/modules/Base/components/imports/ImportWrapper";
import { useTranslations } from "next-intl";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import useHttp from "@/modules/Base/hooks/use-http";
import { exportAccounts, importAccounts } from "../requests/account-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IAccountsImportProps {
  type: ImportType;
}

const AccountsImport: React.FC<IAccountsImportProps> = ({ type }) => {
  const t = useTranslations("Account.Widgets.AccountsImport");

  const {
    handle: handleImportAccounts,
    response: responseImportAccounts,
    error: errorImportAccounts,
  } = useHttp(moduleConfig, importAccounts, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importAccounts.success_message"),
        },
      });
    },
  });

  const importAccountsHandler: TOnFileUpload = (type, file) => {
    return handleImportAccounts(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportAccounts, loading: loadingExportAccounts } = useHttp(
    moduleConfig,
    exportAccounts
  );

  const exportAccountsHandler: TOnExportSampleFile = (type) => {
    return handleExportAccounts(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.ACCOUNT);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importAccountsHandler}
      total={(responseImportAccounts?.total ?? 0) as number}
      success={(responseImportAccounts?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportAccounts?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportAccountsHandler}
      loadingExportSampleFile={loadingExportAccounts}
      rows={[
        {
          name: "status",
          desc: t("status_desc", {
            type: ImportRowType.STRING,
            options: statuses.map((status) => status.value).join(", "),
          }),
        },
        {
          name: "type",
          desc: t("type_desc", {
            type: ImportRowType.STRING,
            options: types.map((type) => type.value).join(", "),
          }),
        },
        {
          name: "first_name",
          desc: t("first_name_desc", {
            type: ImportRowType.STRING,
          }),
        },
        {
          name: "last_name",
          desc: t("last_name_desc", {
            type: ImportRowType.STRING,
          }),
        },
        {
          name: "mobile",
          desc: t("mobile_desc", {
            type: ImportRowType.STRING,
            example: "09xxxxxxxxx",
          }),
        },
        {
          name: "email",
          desc: t("email_desc", {
            type: ImportRowType.STRING,
            example: "example@gmail.com",
          }),
        },
      ]}
    />
  );
};

export default AccountsImport;
