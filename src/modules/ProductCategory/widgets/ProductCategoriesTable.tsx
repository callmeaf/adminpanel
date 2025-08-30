import Table from "@/modules/Base/components/tables/Table";
import TablePagination, {
  TOnPageChange,
  TOnPerPageChange,
} from "@/modules/Base/components/tables/TablePagination";
import { IPaginateModel } from "@/modules/Base/models/Paginate";
import { IProductCategoryModel } from "../models/ProductCategory";
import { TableCell, TableRow } from "@mui/material";
import * as React from "react";
import {
  EnumSource,
  localStorageArtisan,
} from "@/modules/Base/helpers/local-storage-artisan";
import TableSearch, {
  TOnSearch,
} from "@/modules/Base/components/tables/TableSearch";
import useMounted from "@/modules/Base/hooks/use-mounted";
import TableDates, {
  TOnDatesChange,
} from "@/modules/Base/components/tables/TableDates";
import { useTranslations } from "next-intl";
import TableFilter, {
  TOnFilter,
} from "@/modules/Base/components/tables/TableFilter";
import ProductCategoriesTableFilter from "./ProductCategoriesTableFilter";
import moment from "moment-jalaali";
import { TOnDelete } from "@/modules/Base/components/tables/actions/TableDeleteAction";
import { TOnEdit } from "@/modules/Base/components/tables/actions/TableEditAction";
import TableAction from "@/modules/Base/components/tables/TableAction";
import TableSelectOptionColumnAction, {
  TOnUpdate,
} from "@/modules/Base/components/tables/actions/TableSelectOptionColumnAction";
import Show from "@/modules/Base/components/common/Show";
import TableNoData from "@/modules/Base/components/tables/TableNoData";
import TableExport, {
  TOnExport,
} from "@/modules/Base/components/tables/TableExport";
import { TOnForceDelete } from "@/modules/Base/components/tables/actions/TableForceDeleteAction";
import { TOnRestore } from "@/modules/Base/components/tables/actions/TableRestoreAction";

interface IProductCategoriesTableProps {
  tableId: string;
  trashed: boolean;
  productCategories: IProductCategoryModel[];
  paginate: IPaginateModel;
  onPageChange: TOnPageChange;
  onPerPageChange: TOnPerPageChange;
  onSearch: TOnSearch;
  onDateChange: TOnDatesChange;
  onFilter: TOnFilter;
  loading: boolean;
  onDelete: TOnDelete<IProductCategoryModel> | TOnForceDelete<IProductCategoryModel>;
  loadingDelete: boolean;
  onRestore: TOnRestore<IProductCategoryModel>;
  loadingRestore: boolean;
  onEdit: TOnEdit<IProductCategoryModel>;
  onStatusUpdate: TOnUpdate<IProductCategoryModel>;
  onTypeUpdate: TOnUpdate<IProductCategoryModel>;
  onExport: TOnExport;
}

const ProductCategoriesTable: React.FC<IProductCategoriesTableProps> = ({
  tableId,
  trashed,
  productCategories,
  paginate,
  onPageChange,
  onPerPageChange,
  onSearch,
  onDateChange,
  onFilter,
  loading,
  onDelete,
  loadingDelete,
  onEdit,
  onStatusUpdate,
  onTypeUpdate,
  onExport,
  onRestore,
  loadingRestore,
}) => {
  const t = useTranslations("ProductCategory.Widgets.Table");
  const { mounted } = useMounted();

  if (!mounted) {
    return;
  }

  const config = localStorageArtisan.get(tableId, true) ?? {};
  const { statuses, types } = localStorageArtisan.enums(EnumSource.PRODUCT_CATEGORY) ?? {};

  return (
    <Table
      id={tableId}
      columns={[
        {
          id: "no",
          label: t("no_label"),
        },
        {
          id: "slug",
          label: t("slug_label"),
        },
        {
          id: "title",
          label: t("title_label"),
        },
        {
          id: "parent_id",
          label: t("parent_id_label"),
        },
        {
          id: "status",
          label: t("status_label"),
        },
        {
          id: "type",
          label: t("type_label"),
        },
        {
          id: "created_at",
          label: t("created_at_label"),
        },
        {
          id: "action",
          label: t("action_label"),
        },
      ]}
      search={
        <TableSearch
          onSearch={onSearch}
          params={[
            {
              key: "slug",
              label: t("slug_label"),
            },
            {
              key: "title",
              label: t("title_label"),
            },
            {
              key: "parent_id",
              label: t("parent_id_label"),
            },
          ]}
          tableId={tableId}
          defaultValue={config.term}
        />
      }
      dates={
        <TableDates
          tableId={tableId}
          onDateChange={onDateChange}
          fromDateDefaultValue={
            config.created_from ? moment(config.created_from) : undefined
          }
          toDateDefaultValue={
            config.created_to ? moment(config.created_to) : undefined
          }
        />
      }
      filter={
        <TableFilter tableId={tableId} onFilter={onFilter}>
          <ProductCategoriesTableFilter
            tableId={tableId}
            defaultStatusValue={config.status}
            defaultTypeValue={config.type}
            statuses={statuses}
            types={types}
          />
        </TableFilter>
      }
      exporter={<TableExport tableId={tableId} onExport={onExport} />}
      pagination={
        <TablePagination
          tableId={tableId}
          paginate={paginate}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
          perPageValue={config.per_page}
        />
      }
      loading={loading}
    >
      <Show when={productCategories.length === 0}>
        <Show.When>
          <TableNoData />
        </Show.When>
        <Show.Else>
          {productCategories.map((productCategory, index) => (
            <TableRow key={productCategory.id}>
              <TableCell>{paginate.from + index}</TableCell>
              <TableCell>{productCategory.slug}</TableCell>
              <TableCell>{productCategory.title}</TableCell>
              <TableCell>{productCategory.parentId}</TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="status"
                  defaultValue={productCategory.status}
                  options={statuses}
                  onUpdate={onStatusUpdate}
                  model={productCategory}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="type"
                  defaultValue={productCategory.type}
                  options={types}
                  onUpdate={onTypeUpdate}
                  model={productCategory}
                  disabled={true}
                />
              </TableCell>
                <TableCell>
                    {productCategory.createdAtText}
              </TableCell>
              <TableCell width={300}>
                <TableAction
                  model={productCategory}
                  onDelete={trashed ? undefined : onDelete}
                  loadingDelete={loadingDelete}
                  onEdit={trashed ? undefined : onEdit}
                  onRestore={trashed ? onRestore : undefined}
                  loadingRestore={loadingRestore}
                  onForceDelete={trashed ? onDelete : undefined}
                  loadingForceDelete={loadingDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </Show.Else>
      </Show>
    </Table>
  );
};

export default ProductCategoriesTable;
