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
import { exportComments, importComments } from "../requests/comment-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ICommentsImportProps {
  type: ImportType;
}

const CommentsImport: React.FC<ICommentsImportProps> = ({ type }) => {
  const t = useTranslations("Comment.Widgets.CommentsImport");

  const {
    handle: handleImportComments,
    response: responseImportComments,
    error: errorImportComments,
  } = useHttp(moduleConfig, importComments, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importComments.success_message"),
        },
      });
    },
  });

  const importCommentsHandler: TOnFileUpload = (type, file) => {
    return handleImportComments(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportComments, loading: loadingExportComments } = useHttp(
    moduleConfig,
    exportComments
  );

  const exportCommentsHandler: TOnExportSampleFile = (type) => {
    return handleExportComments(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.COMMENT);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importCommentsHandler}
      total={(responseImportComments?.total ?? 0) as number}
      success={(responseImportComments?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportComments?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportCommentsHandler}
      loadingExportSampleFile={loadingExportComments}
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

export default CommentsImport;
