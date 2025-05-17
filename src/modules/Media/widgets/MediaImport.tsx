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
import { exportMedia, importMedia } from "../requests/media-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IMediaImportProps {
  type: ImportType;
}

const MediaImport: React.FC<IMediaImportProps> = ({ type }) => {
  const t = useTranslations("Media.Widgets.MediaImport");

  const {
    handle: handleImportMedia,
    response: responseImportMedia,
    error: errorImportMedia,
  } = useHttp(moduleConfig, importMedia, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importMedia.success_message"),
        },
      });
    },
  });

  const importMediaHandler: TOnFileUpload = (type, file) => {
    return handleImportMedia(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportMedia, loading: loadingExportMedia } = useHttp(
    moduleConfig,
    exportMedia
  );

  const exportMediaHandler: TOnExportSampleFile = (type) => {
    return handleExportMedia(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.MEDIA);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importMediaHandler}
      total={(responseImportMedia?.total ?? 0) as number}
      success={(responseImportMedia?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportMedia?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportMediaHandler}
      loadingExportSampleFile={loadingExportMedia}
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

export default MediaImport;
