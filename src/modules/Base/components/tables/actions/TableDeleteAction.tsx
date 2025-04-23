import { IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import {
  Delete as DeleteIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Show from "../../common/Show";

export type TOnDelete<T> = (model: T) => Promise<void>;

interface ITableDeleteActionProps<T> {
  model: T;
  onDelete: TOnDelete<T>;
  loading: boolean;
}

const TableDeleteAction = <T,>({
  model,
  onDelete,
  loading,
}: ITableDeleteActionProps<T>) => {
  const t = useTranslations("Base.Components.Table");

  const [mode, setMode] = React.useState<"confirm" | "delete">("confirm");

  const handleConfirm = () => {
    setMode("delete");
  };

  const handleDelete = async () => {
    try {
      await onDelete(model);
    } catch (e) {
    } finally {
      setMode("confirm");
    }
  };

  const handleCancel = () => {
    setMode("confirm");
  };

  return (
    <Show when={mode === "confirm"}>
      <Show.When>
        <Tooltip title={t("delete_btn_tooltip")}>
          <IconButton color="error" onClick={handleConfirm}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Show.When>
      <Show.Else>
        <>
          <Tooltip title={t("cancel_action_label")}>
            <IconButton onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("accept_action_label")}>
            <IconButton
              onClick={handleDelete}
              color="success"
              loading={loading}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      </Show.Else>
    </Show>
  );
};

export default TableDeleteAction;
