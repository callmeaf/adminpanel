import Table from "@/modules/Base/components/tables/Table";
import TablePagination, {
  TOnPageChange,
  TOnPerPageChange,
} from "@/modules/Base/components/tables/TablePagination";
import { IPaginateModel } from "@/modules/Base/models/Paginate";
import { ITicketModel } from "../models/Ticket";
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
import TicketsTableFilter from "./TicketsTableFilter";
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

interface ITicketsTableProps {
  tableId: string;
  trashed: boolean;
  tickets: ITicketModel[];
  paginate: IPaginateModel;
  onPageChange: TOnPageChange;
  onPerPageChange: TOnPerPageChange;
  onSearch: TOnSearch;
  onDateChange: TOnDatesChange;
  onFilter: TOnFilter;
  loading: boolean;
  onDelete: TOnDelete<ITicketModel> | TOnForceDelete<ITicketModel>;
  loadingDelete: boolean;
  onRestore: TOnRestore<ITicketModel>;
  loadingRestore: boolean;
  onEdit: TOnEdit<ITicketModel>;
  onStatusUpdate: TOnUpdate<ITicketModel>;
  onTypeUpdate: TOnUpdate<ITicketModel>;
  onSubjectUpdate: TOnUpdate<ITicketModel>;
  onExport: TOnExport;
}

const TicketsTable: React.FC<ITicketsTableProps> = ({
  tableId,
  trashed,
  tickets,
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
  onSubjectUpdate,
  onExport,
  onRestore,
  loadingRestore,
}) => {
  const t = useTranslations("Ticket.Widgets.Table");
  const { mounted } = useMounted();

  if (!mounted) {
    return;
  }

  const config = localStorageArtisan.get(tableId, true) ?? {};
  const { statuses, types, subjects } =
    localStorageArtisan.enums(EnumSource.TICKET) ?? {};

  return (
    <Table
      id={tableId}
      columns={[
        {
          id: "no",
          label: t("no_label"),
        },
        {
          id: "sender_identifier",
          label: t("sender_identifier_label"),
        },
        {
          id: "receiver_identifier",
          label: t("receiver_identifier_label"),
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
          id: "subject",
          label: t("subject_label"),
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
              key: "sender_identifier",
              label: t("sender_identifier_label"),
            },
            {
              key: "receiver_identifier",
              label: t("receiver_identifier_label"),
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
          <TicketsTableFilter
            tableId={tableId}
            defaultStatusValue={config.status}
            defaultTypeValue={config.type}
            defaultSubjectValue={config.subject}
            statuses={statuses}
            types={types}
            subjects={subjects}
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
      <Show when={tickets.length === 0}>
        <Show.When>
          <TableNoData />
        </Show.When>
        <Show.Else>
          {tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell>{paginate.from + index}</TableCell>
              <TableCell>{ticket.senderIdentifier}</TableCell>
              <TableCell>{ticket.receiverIdentifier}</TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="status"
                  defaultValue={ticket.status}
                  options={statuses}
                  onUpdate={onStatusUpdate}
                  model={ticket}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="type"
                  defaultValue={ticket.type}
                  options={types}
                  onUpdate={onTypeUpdate}
                  model={ticket}
                  disabled={true}
                />
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="subject"
                  defaultValue={ticket.subject}
                  options={subjects}
                  onUpdate={onSubjectUpdate}
                  model={ticket}
                  disabled={true}
                />
              </TableCell>
              <TableCell>{ticket.createdAtText}</TableCell>
              <TableCell width={300}>
                <TableAction
                  model={ticket}
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

export default TicketsTable;
