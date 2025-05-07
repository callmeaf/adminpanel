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
import { exportSocials, importSocials } from "../requests/social-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface ISocialsImportProps {
  type: ImportType;
}

const SocialsImport: React.FC<ISocialsImportProps> = ({ type }) => {
  const t = useTranslations("Social.Widgets.SocialsImport");

  const {
    handle: handleImportSocials,
    response: responseImportSocials,
    error: errorImportSocials,
  } = useHttp(moduleConfig, importSocials, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importSocials.success_message"),
        },
      });
    },
  });

  const importSocialsHandler: TOnFileUpload = (type, file) => {
    return handleImportSocials(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportSocials, loading: loadingExportSocials } = useHttp(
    moduleConfig,
    exportSocials
  );

  const exportSocialsHandler: TOnExportSampleFile = (type) => {
    return handleExportSocials(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.SOCIAL);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importSocialsHandler}
      total={(responseImportSocials?.total ?? 0) as number}
      success={(responseImportSocials?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportSocials?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportSocialsHandler}
      loadingExportSampleFile={loadingExportSocials}
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

export default SocialsImport;
