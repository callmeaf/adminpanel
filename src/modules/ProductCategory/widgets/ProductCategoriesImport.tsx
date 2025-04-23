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
import { exportProductCategories, importProductCategories } from "../requests/product-category-requests";
import moduleConfig from "../module.config";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import importArtisan from "@/modules/Base/helpers/import-artisan";

interface IProductCategoriesImportProps {
  type: ImportType;
}

const ProductCategoriesImport: React.FC<IProductCategoriesImportProps> = ({ type }) => {
  const t = useTranslations("ProductCategory.Widgets.ProductCategoriesImport");

  const {
    handle: handleImportProductCategories,
    response: responseImportProductCategories,
    error: errorImportProductCategories,
  } = useHttp(moduleConfig, importProductCategories, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("importProductCategories.success_message"),
        },
      });
    },
  });

  const importProductCategoriesHandler: TOnFileUpload = (type, file) => {
    return handleImportProductCategories(
      {
        file,
      },
      {
        type,
      }
    );
  };

  const { handle: handleExportProductCategories, loading: loadingExportProductCategories } = useHttp(
    moduleConfig,
    exportProductCategories
  );

  const exportProductCategoriesHandler: TOnExportSampleFile = (type) => {
    return handleExportProductCategories(
      {
        page: 1,
        per_page: 1,
      },
      {
        type,
      }
    );
  };

  const { statuses, types } = localStorageArtisan.enums(EnumSource.PRODUCT_CATEGORY);

  return (
    <ImportWrapper
      type={type}
      maxSize={5}
      onFileUpload={importProductCategoriesHandler}
      total={(responseImportProductCategories?.total ?? 0) as number}
      success={(responseImportProductCategories?.success ?? 0) as number}
      errors={importArtisan.errors(
        errorImportProductCategories?.response?.data?.errors ?? []
      )}
      onExportSampleFile={exportProductCategoriesHandler}
      loadingExportSampleFile={loadingExportProductCategories}
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

export default ProductCategoriesImport;
