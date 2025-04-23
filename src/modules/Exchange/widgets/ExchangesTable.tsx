import Table from "@/modules/Base/components/tables/Table";
import TablePagination, {
  TOnPageChange,
  TOnPerPageChange,
} from "@/modules/Base/components/tables/TablePagination";
import { IPaginateModel } from "@/modules/Base/models/Paginate";
import { IExchangeModel } from "../models/Exchange";
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
import ExchangesTableFilter from "./ExchangesTableFilter";
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

interface IExchangesTableProps {
  tableId: string;
  trashed: boolean;
  exchanges: IExchangeModel[];
  paginate: IPaginateModel;
  onPageChange: TOnPageChange;
  onPerPageChange: TOnPerPageChange;
  onSearch: TOnSearch;
  onDateChange: TOnDatesChange;
  onFilter: TOnFilter;
  loading: boolean;
  onDelete: TOnDelete<IExchangeModel> | TOnForceDelete<IExchangeModel>;
  loadingDelete: boolean;
  onRestore: TOnRestore<IExchangeModel>;
  loadingRestore: boolean;
  onEdit: TOnEdit<IExchangeModel>;
  onStatusUpdate: TOnUpdate<IExchangeModel>;
  onTypeUpdate: TOnUpdate<IExchangeModel>;
  onExport: TOnExport;
}

const ExchangesTable: React.FC<IExchangesTableProps> = ({
  tableId,
  trashed,
  exchanges,
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
  const t = useTranslations("Exchange.Widgets.Table");
  const { mounted } = useMounted();

  if (!mounted) {
    return;
  }

  const config = localStorageArtisan.get(tableId, true) ?? {};
  const { statuses, types } = localStorageArtisan.enums(EnumSource.EXCHANGE) ?? {};

  return (
    <Table
      id={tableId}
      columns={[
        {
          id: "no",
          label: t("no_label"),
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
          // {
          //   key: "key",
          //   label: t("key_label"),
          // },
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
          <ExchangesTableFilter
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
      <Show when={exchanges.length === 0}>
        <Show.When>
          <TableNoData />
        </Show.When>
        <Show.Else>
          {exchanges.map((exchange, index) => (
            <TableRow key={exchange.id}>
              <TableCell>{paginate.from + index}</TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="status"
                  defaultValue={exchange.status}
                  options={statuses}
                  onUpdate={onStatusUpdate}
                  model={exchange}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="type"
                  defaultValue={exchange.type}
                  options={types}
                  onUpdate={onTypeUpdate}
                  model={exchange}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell width={300}>
                <TableAction
                  model={exchange}
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

export default ExchangesTable;
