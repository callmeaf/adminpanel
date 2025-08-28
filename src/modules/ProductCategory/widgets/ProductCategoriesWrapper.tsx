import * as React from "react";
import ProductCategoriesTable from "./ProductCategoriesTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteProductCategory,
  exportProductCategories,
  forceDeleteProductCategory,
  getProductCategories,
  getProductCategoriesTrashed,
  restoreProductCategory,
  updateProductCategoryStatus,
  updateProductCategoryType,
} from "@/modules/ProductCategory/requests/product-category-requests";
import toProductCategory, { IProductCategoryModel } from "../models/ProductCategory";
import toPaginate from "@/modules/Base/models/Paginate";
import { localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";
import { TOnDatesChange } from "@/modules/Base/components/tables/TableDates";
import moduleConfig from "../module.config";
import { TOnFilter } from "@/modules/Base/components/tables/TableFilter";
import { TOnEdit } from "@/modules/Base/components/tables/actions/TableEditAction";
import { TOnDelete } from "@/modules/Base/components/tables/actions/TableDeleteAction";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import { useRouter } from "@/i18n/routing";
import useRoutes from "@/modules/Base/hooks/use-routes";
import { TOnUpdate } from "@/modules/Base/components/tables/actions/TableSelectOptionColumnAction";
import {
  ExportType,
  TOnExport,
} from "@/modules/Base/components/tables/TableExport";
import { TOnRestore } from "@/modules/Base/components/tables/actions/TableRestoreAction";

let TABLE_ID: string;

interface IProductCategoriesWrapperProps {
  trashed?: boolean;
}

const ProductCategoriesWrapper: React.FC<IProductCategoriesWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "product_category_trashed_table";
  } else {
    TABLE_ID = "product_category_list_table";
  }

  const {
    handle: handleGetProductCategories,
    response: responseGetProductCategories,
    loading: loadingGetProductCategories,
  } = useHttp(moduleConfig, trashed ? getProductCategoriesTrashed : getProductCategories);

  const handlePageChange = (page: number) =>
    handleGetProductCategories(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetProductCategories(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetProductCategories(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetProductCategories(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetProductCategories(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IProductCategoryModel> = (productCategory) => {
      const productCategoryEditRoute = getRouteByName("product_categories_edit", {
      productCategoryId: productCategory.id,
    });
    if (productCategoryEditRoute) {
      router.push(productCategoryEditRoute.href);
    }
  };

  const { handle: handleDeleteProductCategory, loading: loadingDeleteProductCategory } = useHttp(
    moduleConfig,
    trashed ? forceDeleteProductCategory : deleteProductCategory,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteProductCategory.success_message")
              : tr("deleteProductCategory.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IProductCategoryModel> = async (productCategory) => {
    await handleDeleteProductCategory(
      {},
      {
        productCategoryId: productCategory.id,
      }
    );
    handleGetProductCategories();
  };

  const { handle: handleRestoreProductCategory, loading: loadingRestoreProductCategory } = useHttp(
    moduleConfig,
    restoreProductCategory,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreProductCategory.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IProductCategoryModel> = async (model) => {
    await handleRestoreProductCategory(
      {},
      {
        productCategoryId: model.id,
      }
    );
    handleGetProductCategories();
  };

  React.useEffect(() => {
    handleGetProductCategories(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateProductCategoryStatus } = useHttp(
    moduleConfig,
    updateProductCategoryStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateProductCategoryStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateProductCategoryType } = useHttp(
    moduleConfig,
    updateProductCategoryType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateProductCategoryType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IProductCategoryModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateProductCategoryStatus(
        {
          status: target.value,
        },
        {
          productCategoryId: model.id,
        }
      );
    } else {
      handleUpdateProductCategoryType(
        {
          type: target.value,
        },
        {
          productCategoryId: model.id,
        }
      );
    }
  };

  const { handle: handleExportProductCategories } = useHttp(moduleConfig, exportProductCategories, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportProductCategories.success_message"),
        },
      });
    },
  });
  const handleExport: TOnExport = (type, data) => {
    data = {
      ...(localStorageArtisan.get(TABLE_ID, true) ?? {}),
      page: data.page,
      trashed,
    };
    switch (type) {
      case ExportType.EXCEL: {
        handleExportProductCategories(data, {
          type,
        });
        break;
      }
      default: {
        console.warn(`No export type find for ( ${type} )`);
      }
    }
  };

  return (
    <ProductCategoriesTable
      tableId={TABLE_ID}
      productCategories={responseGetProductCategories?.data.map((item) => toProductCategory(item)) ?? []}
      paginate={toPaginate({
        links: responseGetProductCategories?.links,
        meta: responseGetProductCategories?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetProductCategories}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteProductCategory}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreProductCategory}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default ProductCategoriesWrapper;
