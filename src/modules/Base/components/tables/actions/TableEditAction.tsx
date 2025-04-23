import { IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";

export type TOnEdit<T> = (model: T) => void;

interface ITableEditActionProps<T> {
  model: T;
  onEdit: TOnEdit<T>;
}

const TableEditAction = <T,>({ model, onEdit }: ITableEditActionProps<T>) => {
  const t = useTranslations("Base.Components.Table");

  const handleEdit = () => {
    if (onEdit) {
      onEdit(model);
    }
  };

  return (
    <Tooltip title={t("edit_btn_tooltip")}>
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TableEditAction;
