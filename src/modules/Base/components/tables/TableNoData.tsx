import { TableCell, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";

interface ITableNoDataProps {
  text?: string;
}

const TableNoData: React.FC<ITableNoDataProps> = ({ text }) => {
  const t = useTranslations("Base.Components.Table");

  if (!text) {
    text = t("no_data_text");
  }

  return (
    <TableRow>
      <TableCell colSpan={90} sx={{ textAlign: "center" }}>
        {text}
      </TableCell>
    </TableRow>
  );
};

export default TableNoData;
