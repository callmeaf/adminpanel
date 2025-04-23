import { Box } from "@mui/material";
import * as React from "react";
import TableEditAction, { TOnEdit } from "./actions/TableEditAction";
import TableDeleteAction, { TOnDelete } from "./actions/TableDeleteAction";
import TableRestoreAction, { TOnRestore } from "./actions/TableRestoreAction";
import TableForceDeleteAction, {
  TOnForceDelete,
} from "./actions/TableForceDeleteAction";

interface ITableActionProps<T> {
  model: T;
  onEdit?: TOnEdit<T>;
  onDelete?: TOnDelete<T>;
  onRestore?: TOnRestore<T>;
  onForceDelete?: TOnForceDelete<T>;
  loadingDelete: boolean;
  loadingRestore: boolean;
  loadingForceDelete: boolean;
}

const TableAction = <T,>({
  model,
  onEdit,
  onDelete,
  onRestore,
  onForceDelete,
  loadingDelete,
  loadingRestore,
  loadingForceDelete,
}: ITableActionProps<T>) => {
  return (
    <Box display={"flex"} gap={2}>
      {onEdit && <TableEditAction model={model} onEdit={onEdit} />}
      {onDelete && (
        <TableDeleteAction
          model={model}
          onDelete={onDelete}
          loading={loadingDelete}
        />
      )}
      {onRestore && (
        <TableRestoreAction
          loading={loadingRestore}
          model={model}
          onRestore={onRestore}
        />
      )}
      {onForceDelete && (
        <TableForceDeleteAction
          loading={loadingForceDelete}
          model={model}
          onForceDelete={onForceDelete}
        />
      )}
    </Box>
  );
};

export default TableAction;
