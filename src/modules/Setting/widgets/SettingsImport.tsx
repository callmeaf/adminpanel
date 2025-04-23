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
import { exportSettings, importSettings } from "../requests/setting-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ISettingsImportProps {
  type: ImportType;
}

const SettingsImport: React.FC<ISettingsImportProps> = ({ type }) => {
  const t = useTranslations("Setting.Widgets.SettingsImport");

  const {
    handle: handleImportSettings,
    response: responseImportSettings,
    error: errorImportSettings,
  } = useHttp(moduleConfig, importSettings, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importSettings.success_message"),
        },
      });
    },
  });

  const importSettingsHandler: TOnFileUpload = (type, file) => {
    return handleImportSettings(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportSettings, loading: loadingExportSettings } = useHttp(
    moduleConfig,
    exportSettings
  );

  const exportSettingsHandler: TOnExportSampleFile = (type) => {
    return handleExportSettings(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.SETTING);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importSettingsHandler}
      total={(responseImportSettings?.total ?? 0) as number}
      success={(responseImportSettings?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportSettings?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportSettingsHandler}
      loadingExportSampleFile={loadingExportSettings}
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

export default SettingsImport;
