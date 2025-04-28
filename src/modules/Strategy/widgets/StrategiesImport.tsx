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
import { exportStrategies, importStrategies } from "../requests/strategy-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IStrategiesImportProps {
  type: ImportType;
}

const StrategiesImport: React.FC<IStrategiesImportProps> = ({ type }) => {
  const t = useTranslations("Strategy.Widgets.StrategiesImport");

  const {
    handle: handleImportStrategies,
    response: responseImportStrategies,
    error: errorImportStrategies,
  } = useHttp(moduleConfig, importStrategies, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importStrategies.success_message"),
        },
      });
    },
  });

  const importStrategiesHandler: TOnFileUpload = (type, file) => {
    return handleImportStrategies(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportStrategies, loading: loadingExportStrategies } = useHttp(
    moduleConfig,
    exportStrategies
  );

  const exportStrategiesHandler: TOnExportSampleFile = (type) => {
    return handleExportStrategies(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.STRATEGY);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importStrategiesHandler}
      total={(responseImportStrategies?.total ?? 0) as number}
      success={(responseImportStrategies?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportStrategies?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportStrategiesHandler}
      loadingExportSampleFile={loadingExportStrategies}
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

export default StrategiesImport;
