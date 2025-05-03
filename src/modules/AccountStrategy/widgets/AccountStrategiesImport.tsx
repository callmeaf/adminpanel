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
import { exportAccountStrategies, importAccountStrategies } from "../requests/account-strategy-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IAccountStrategiesImportProps {
  type: ImportType;
}

const AccountStrategiesImport: React.FC<IAccountStrategiesImportProps> = ({ type }) => {
  const t = useTranslations("AccountStrategy.Widgets.AccountStrategiesImport");

  const {
    handle: handleImportAccountStrategies,
    response: responseImportAccountStrategies,
    error: errorImportAccountStrategies,
  } = useHttp(moduleConfig, importAccountStrategies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importAccountStrategies.success_message"),
        },
      });
    },
  });

  const importAccountStrategiesHandler: TOnFileUpload = (type, file) => {
    return handleImportAccountStrategies(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportAccountStrategies, loading: loadingExportAccountStrategies } = useHttp(
    moduleConfig,
    exportAccountStrategies
  );

  const exportAccountStrategiesHandler: TOnExportSampleFile = (type) => {
    return handleExportAccountStrategies(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.ACCOUNT_STRATEGY);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importAccountStrategiesHandler}
      total={(responseImportAccountStrategies?.total ?? 0) as number}
      success={(responseImportAccountStrategies?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportAccountStrategies?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportAccountStrategiesHandler}
      loadingExportSampleFile={loadingExportAccountStrategies}
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

export default AccountStrategiesImport;
