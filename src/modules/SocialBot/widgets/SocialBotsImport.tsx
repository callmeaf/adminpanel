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
import { exportSocialBots, importSocialBots } from "../requests/social-bot-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ISocialBotsImportProps {
  type: ImportType;
}

const SocialBotsImport: React.FC<ISocialBotsImportProps> = ({ type }) => {
  const t = useTranslations("SocialBot.Widgets.SocialBotsImport");

  const {
    handle: handleImportSocialBots,
    response: responseImportSocialBots,
    error: errorImportSocialBots,
  } = useHttp(moduleConfig, importSocialBots, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importSocialBots.success_message"),
        },
      });
    },
  });

  const importSocialBotsHandler: TOnFileUpload = (type, file) => {
    return handleImportSocialBots(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportSocialBots, loading: loadingExportSocialBots } = useHttp(
    moduleConfig,
    exportSocialBots
  );

  const exportSocialBotsHandler: TOnExportSampleFile = (type) => {
    return handleExportSocialBots(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.SOCIAL_BOT);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importSocialBotsHandler}
      total={(responseImportSocialBots?.total ?? 0) as number}
      success={(responseImportSocialBots?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportSocialBots?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportSocialBotsHandler}
      loadingExportSampleFile={loadingExportSocialBots}
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

export default SocialBotsImport;
