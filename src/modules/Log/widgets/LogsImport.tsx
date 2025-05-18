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
import { exportLogs, importLogs } from "../requests/log-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ILogsImportProps {
  type: ImportType;
}

const LogsImport: React.FC<ILogsImportProps> = ({ type }) => {
  const t = useTranslations("Log.Widgets.LogsImport");

  const {
    handle: handleImportLogs,
    response: responseImportLogs,
    error: errorImportLogs,
  } = useHttp(moduleConfig, importLogs, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importLogs.success_message"),
        },
      });
    },
  });

  const importLogsHandler: TOnFileUpload = (type, file) => {
    return handleImportLogs(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportLogs, loading: loadingExportLogs } = useHttp(
    moduleConfig,
    exportLogs
  );

  const exportLogsHandler: TOnExportSampleFile = (type) => {
    return handleExportLogs(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.LOG);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importLogsHandler}
      total={(responseImportLogs?.total ?? 0) as number}
      success={(responseImportLogs?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportLogs?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportLogsHandler}
      loadingExportSampleFile={loadingExportLogs}
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

export default LogsImport;
