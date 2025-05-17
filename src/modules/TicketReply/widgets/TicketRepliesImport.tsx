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
import { exportTicketReplies, importTicketReplies } from "../requests/ticket-reply-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ITicketRepliesImportProps {
  type: ImportType;
}

const TicketRepliesImport: React.FC<ITicketRepliesImportProps> = ({ type }) => {
  const t = useTranslations("TicketReply.Widgets.TicketRepliesImport");

  const {
    handle: handleImportTicketReplies,
    response: responseImportTicketReplies,
    error: errorImportTicketReplies,
  } = useHttp(moduleConfig, importTicketReplies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importTicketReplies.success_message"),
        },
      });
    },
  });

  const importTicketRepliesHandler: TOnFileUpload = (type, file) => {
    return handleImportTicketReplies(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportTicketReplies, loading: loadingExportTicketReplies } = useHttp(
    moduleConfig,
    exportTicketReplies
  );

  const exportTicketRepliesHandler: TOnExportSampleFile = (type) => {
    return handleExportTicketReplies(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.TICKET_REPLY);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importTicketRepliesHandler}
      total={(responseImportTicketReplies?.total ?? 0) as number}
      success={(responseImportTicketReplies?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportTicketReplies?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportTicketRepliesHandler}
      loadingExportSampleFile={loadingExportTicketReplies}
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

export default TicketRepliesImport;
