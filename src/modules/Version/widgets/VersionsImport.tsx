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
import { exportVersions, importVersions } from "../requests/version-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IVersionsImportProps {
  type: ImportType;
}

const VersionsImport: React.FC<IVersionsImportProps> = ({ type }) => {
  const t = useTranslations("Version.Widgets.VersionsImport");

  const {
    handle: handleImportVersions,
    response: responseImportVersions,
    error: errorImportVersions,
  } = useHttp(moduleConfig, importVersions, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importVersions.success_message"),
        },
      });
    },
  });

  const importVersionsHandler: TOnFileUpload = (type, file) => {
    return handleImportVersions(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportVersions, loading: loadingExportVersions } = useHttp(
    moduleConfig,
    exportVersions
  );

  const exportVersionsHandler: TOnExportSampleFile = (type) => {
    return handleExportVersions(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.VERSION);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importVersionsHandler}
      total={(responseImportVersions?.total ?? 0) as number}
      success={(responseImportVersions?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportVersions?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportVersionsHandler}
      loadingExportSampleFile={loadingExportVersions}
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

export default VersionsImport;
