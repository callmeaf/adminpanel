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
import { exportTickets, importTickets } from "../requests/ticket-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ITicketsImportProps {
  type: ImportType;
}

const TicketsImport: React.FC<ITicketsImportProps> = ({ type }) => {
  const t = useTranslations("Ticket.Widgets.TicketsImport");

  const {
    handle: handleImportTickets,
    response: responseImportTickets,
    error: errorImportTickets,
  } = useHttp(moduleConfig, importTickets, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importTickets.success_message"),
        },
      });
    },
  });

  const importTicketsHandler: TOnFileUpload = (type, file) => {
    return handleImportTickets(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportTickets, loading: loadingExportTickets } = useHttp(
    moduleConfig,
    exportTickets
  );

  const exportTicketsHandler: TOnExportSampleFile = (type) => {
    return handleExportTickets(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.TICKET);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importTicketsHandler}
      total={(responseImportTickets?.total ?? 0) as number}
      success={(responseImportTickets?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportTickets?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportTicketsHandler}
      loadingExportSampleFile={loadingExportTickets}
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

export default TicketsImport;
