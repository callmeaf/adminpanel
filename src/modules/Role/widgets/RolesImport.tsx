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
import { exportRoles, importRoles } from "../requests/role-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IRolesImportProps {
  type: ImportType;
}

const RolesImport: React.FC<IRolesImportProps> = ({ type }) => {
  const t = useTranslations("Role.Widgets.RolesImport");

  const {
    handle: handleImportRoles,
    response: responseImportRoles,
    error: errorImportRoles,
  } = useHttp(moduleConfig, importRoles, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importRoles.success_message"),
        },
      });
    },
  });

  const importRolesHandler: TOnFileUpload = (type, file) => {
    return handleImportRoles(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportRoles, loading: loadingExportRoles } = useHttp(
    moduleConfig,
    exportRoles
  );

  const exportRolesHandler: TOnExportSampleFile = (type) => {
    return handleExportRoles(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.ROLE);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importRolesHandler}
      total={(responseImportRoles?.total ?? 0) as number}
      success={(responseImportRoles?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportRoles?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportRolesHandler}
      loadingExportSampleFile={loadingExportRoles}
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

export default RolesImport;
