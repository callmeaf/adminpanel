import { IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import {
  DeleteForever as DeleteForeverIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Show from "../../common/Show";

export type TOnForceDelete<T> = (model: T) => Promise<void>;

interface ITableForceDeleteActionProps<T> {
  model: T;
  onForceDelete: TOnForceDelete<T>;
  loading: boolean;
}

const TableForceDeleteAction = <T,>({
  model,
  onForceDelete,
  loading,
}: ITableForceDeleteActionProps<T>) => {
  const t = useTranslations("Base.Components.Table");

  const [mode, setMode] = React.useState<"confirm" | "force_delete">("confirm");

  const handleConfirm = () => {
    setMode("force_delete");
  };

  const handleDelete = async () => {
    try {
      await onForceDelete(model);
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
        <Tooltip title={t("force_delete_btn_tooltip")}>
          <IconButton color="error" onClick={handleConfirm}>
            <DeleteForeverIcon />
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

export default TableForceDeleteAction;
