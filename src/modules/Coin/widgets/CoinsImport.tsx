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
import { exportCoins, importCoins } from "../requests/coin-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ICoinsImportProps {
  type: ImportType;
}

const CoinsImport: React.FC<ICoinsImportProps> = ({ type }) => {
  const t = useTranslations("Coin.Widgets.CoinsImport");

  const {
    handle: handleImportCoins,
    response: responseImportCoins,
    error: errorImportCoins,
  } = useHttp(moduleConfig, importCoins, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importCoins.success_message"),
        },
      });
    },
  });

  const importCoinsHandler: TOnFileUpload = (type, file) => {
    return handleImportCoins(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportCoins, loading: loadingExportCoins } = useHttp(
    moduleConfig,
    exportCoins
  );

  const exportCoinsHandler: TOnExportSampleFile = (type) => {
    return handleExportCoins(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.COIN);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importCoinsHandler}
      total={(responseImportCoins?.total ?? 0) as number}
      success={(responseImportCoins?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportCoins?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportCoinsHandler}
      loadingExportSampleFile={loadingExportCoins}
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

export default CoinsImport;
