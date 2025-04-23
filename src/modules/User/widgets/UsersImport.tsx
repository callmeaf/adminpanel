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
import { exportUsers, importUsers } from "../requests/user-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IUsersImportProps {
  type: ImportType;
}

const UsersImport: React.FC<IUsersImportProps> = ({ type }) => {
  const t = useTranslations("User.Widgets.UsersImport");

  const {
    handle: handleImportUsers,
    response: responseImportUsers,
    error: errorImportUsers,
  } = useHttp(moduleConfig, importUsers, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importUsers.success_message"),
        },
      });
    },
  });

  const importUsersHandler: TOnFileUpload = (type, file) => {
    return handleImportUsers(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportUsers, loading: loadingExportUsers } = useHttp(
    moduleConfig,
    exportUsers
  );

  const exportUsersHandler: TOnExportSampleFile = (type) => {
    return handleExportUsers(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.USER);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importUsersHandler}
      total={(responseImportUsers?.total ?? 0) as number}
      success={(responseImportUsers?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportUsers?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportUsersHandler}
      loadingExportSampleFile={loadingExportUsers}
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

export default UsersImport;
