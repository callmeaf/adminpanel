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
import { exportPermissions, importPermissions } from "../requests/permission-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IPermissionsImportProps {
  type: ImportType;
}

const PermissionsImport: React.FC<IPermissionsImportProps> = ({ type }) => {
  const t = useTranslations("Permission.Widgets.PermissionsImport");

  const {
    handle: handleImportPermissions,
    response: responseImportPermissions,
    error: errorImportPermissions,
  } = useHttp(moduleConfig, importPermissions, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importPermissions.success_message"),
        },
      });
    },
  });

  const importPermissionsHandler: TOnFileUpload = (type, file) => {
    return handleImportPermissions(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportPermissions, loading: loadingExportPermissions } = useHttp(
    moduleConfig,
    exportPermissions
  );

  const exportPermissionsHandler: TOnExportSampleFile = (type) => {
    return handleExportPermissions(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.PERMISSION);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importPermissionsHandler}
      total={(responseImportPermissions?.total ?? 0) as number}
      success={(responseImportPermissions?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportPermissions?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportPermissionsHandler}
      loadingExportSampleFile={loadingExportPermissions}
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

export default PermissionsImport;
