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
import { exportExchanges, importExchanges } from "../requests/exchange-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IExchangesImportProps {
  type: ImportType;
}

const ExchangesImport: React.FC<IExchangesImportProps> = ({ type }) => {
  const t = useTranslations("Exchange.Widgets.ExchangesImport");

  const {
    handle: handleImportExchanges,
    response: responseImportExchanges,
    error: errorImportExchanges,
  } = useHttp(moduleConfig, importExchanges, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importExchanges.success_message"),
        },
      });
    },
  });

  const importExchangesHandler: TOnFileUpload = (type, file) => {
    return handleImportExchanges(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportExchanges, loading: loadingExportExchanges } = useHttp(
    moduleConfig,
    exportExchanges
  );

  const exportExchangesHandler: TOnExportSampleFile = (type) => {
    return handleExportExchanges(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.EXCHANGE);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importExchangesHandler}
      total={(responseImportExchanges?.total ?? 0) as number}
      success={(responseImportExchanges?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportExchanges?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportExchangesHandler}
      loadingExportSampleFile={loadingExportExchanges}
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

export default ExchangesImport;
