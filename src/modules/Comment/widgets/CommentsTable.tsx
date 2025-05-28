import Table from "@/modules/Base/components/tables/Table";
import TablePagination, {
  TOnPageChange,
  TOnPerPageChange,
} from "@/modules/Base/components/tables/TablePagination";
import { IPaginateModel } from "@/modules/Base/models/Paginate";
import { ICommentModel } from "../models/Comment";
import { Avatar, TableCell, TableRow } from "@mui/material";
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
import CommentsTableFilter from "./CommentsTableFilter";
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
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";

interface ICommentsTableProps {
  tableId: string;
  trashed: boolean;
  comments: ICommentModel[];
  paginate: IPaginateModel;
  onPageChange: TOnPageChange;
  onPerPageChange: TOnPerPageChange;
  onSearch: TOnSearch;
  onDateChange: TOnDatesChange;
  onFilter: TOnFilter;
  loading: boolean;
  onDelete: TOnDelete<ICommentModel> | TOnForceDelete<ICommentModel>;
  loadingDelete: boolean;
  onRestore: TOnRestore<ICommentModel>;
  loadingRestore: boolean;
  onEdit: TOnEdit<ICommentModel>;
  onStatusUpdate: TOnUpdate<ICommentModel>;
  onTypeUpdate: TOnUpdate<ICommentModel>;
  onExport: TOnExport;
}

const CommentsTable: React.FC<ICommentsTableProps> = ({
  tableId,
  trashed,
  comments,
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
  const t = useTranslations("Comment.Widgets.Table");
  const { mounted } = useMounted();

  if (!mounted) {
    return;
  }

  const config = localStorageArtisan.get(tableId, true) ?? {};
  const { statuses, types } =
    localStorageArtisan.enums(EnumSource.COMMENT) ?? {};

  return (
    <Table
      id={tableId}
      columns={[
        {
          id: "no",
          label: t("no_label"),
        },
        {
          id: "avatar",
          label: t("avatar_label"),
        },
        {
          id: "author_identifier",
          label: t("author_identifier_label"),
        },
        {
          id: "is_parent",
          label: t("is_parent_label"),
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
          params={
            [
              // {
              //   key: "key",
              //   label: t("key_label"),
              // },
            ]
          }
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
          <CommentsTableFilter
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
      <Show when={comments.length === 0}>
        <Show.When>
          <TableNoData />
        </Show.When>
        <Show.Else>
          {comments.map((comment, index) => (
            <TableRow key={comment.id}>
              <TableCell>{paginate.from + index}</TableCell>
              <TableCell>
                <Avatar src={comment.author?.image?.url ?? undefined}>
                  {comment.authorIdentifier.charAt(0).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell>{comment.authorIdentifier}</TableCell>
              <TableCell>
                {comment.parentId ? undefined : <MarkChatReadIcon />}
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="status"
                  defaultValue={comment.status}
                  options={statuses}
                  onUpdate={onStatusUpdate}
                  model={comment}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell>
                <TableSelectOptionColumnAction
                  name="type"
                  defaultValue={comment.type}
                  options={types}
                  onUpdate={onTypeUpdate}
                  model={comment}
                  disabled={trashed}
                />
              </TableCell>
              <TableCell>{comment.createdAtText}</TableCell>
              <TableCell width={300}>
                <TableAction
                  model={comment}
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

export default CommentsTable;
