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
import { exportAccountStrategyCoins, importAccountStrategyCoins } from "../requests/account-strategy-coin-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IAccountStrategyCoinsImportProps {
  type: ImportType;
}

const AccountStrategyCoinsImport: React.FC<IAccountStrategyCoinsImportProps> = ({ type }) => {
  const t = useTranslations("AccountStrategyCoin.Widgets.AccountStrategyCoinsImport");

  const {
    handle: handleImportAccountStrategyCoins,
    response: responseImportAccountStrategyCoins,
    error: errorImportAccountStrategyCoins,
  } = useHttp(moduleConfig, importAccountStrategyCoins, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importAccountStrategyCoins.success_message"),
        },
      });
    },
  });

  const importAccountStrategyCoinsHandler: TOnFileUpload = (type, file) => {
    return handleImportAccountStrategyCoins(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportAccountStrategyCoins, loading: loadingExportAccountStrategyCoins } = useHttp(
    moduleConfig,
    exportAccountStrategyCoins
  );

  const exportAccountStrategyCoinsHandler: TOnExportSampleFile = (type) => {
    return handleExportAccountStrategyCoins(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.ACCOUNT_STRATEGY_COIN);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importAccountStrategyCoinsHandler}
      total={(responseImportAccountStrategyCoins?.total ?? 0) as number}
      success={(responseImportAccountStrategyCoins?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportAccountStrategyCoins?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportAccountStrategyCoinsHandler}
      loadingExportSampleFile={loadingExportAccountStrategyCoins}
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

export default AccountStrategyCoinsImport;
