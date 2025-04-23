import { IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import {
  Recycling as RecyclingIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Show from "../../common/Show";

export type TOnRestore<T> = (model: T) => Promise<void>;

interface ITableRestoreActionProps<T> {
  model: T;
  onRestore: TOnRestore<T>;
  loading: boolean;
}

const TableRestoreAction = <T,>({
  model,
  onRestore,
  loading,
}: ITableRestoreActionProps<T>) => {
  const t = useTranslations("Base.Components.Table");

  const [mode, setMode] = React.useState<"confirm" | "restore">("confirm");

  const handleConfirm = () => {
    setMode("restore");
  };

  const handleRestore = async () => {
    try {
      await onRestore(model);
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
        <Tooltip title={t("restore_btn_tooltip")}>
          <IconButton color="primary" onClick={handleConfirm}>
            <RecyclingIcon />
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
              onClick={handleRestore}
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

export default TableRestoreAction;
