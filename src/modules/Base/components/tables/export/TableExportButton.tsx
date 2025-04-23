import * as React from "react";
import {
  AutoStories as AutoStoriesIcon,
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";
import { Box, Button, ButtonProps, IconButton, Tooltip } from "@mui/material";
import { ExportType, TOnExport } from "../TableExport";
import Show from "../../common/Show";
import { useTranslations } from "next-intl";

interface ITableExportButtonProps {
  type: ExportType;
  onExport: TOnExport;
  currentPage: number;
}

const btnColor = (type: ExportType): ButtonProps["color"] => {
  switch (type) {
    case ExportType.EXCEL: {
      return "success";
    }
  }
};

const TableExportButton: React.FC<ITableExportButtonProps> = ({
  type,
  onExport,
  currentPage,
}) => {
  const t = useTranslations("Base.Components.Table");

  const [mode, setMode] = React.useState<"confirm" | "export">("confirm");

  const handleChangeMode = () => setMode("export");

  const handleExport = (page: "all" | number) => {
    if (page === "all") {
      onExport(type, {
        page: "all",
      });
    } else {
      onExport(type, {
        page: currentPage,
      });
    }
    setMode("confirm");
  };
  const color = btnColor(type);

  return (
    <Show when={mode === "confirm"}>
      <Show.When>
        <Button variant="contained" color={color} onClick={handleChangeMode}>
          {t(`${type}_btn_label`)}
        </Button>
      </Show.When>
      <Show.Else>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Tooltip
            title={t("export_all_pages_tooltip", {
              type,
            })}
          >
            <IconButton
              onClick={handleExport.bind(null, "all")}
              color="primary"
            >
              <AutoStoriesIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={t("export_current_page_tooltip", {
              type,
              page: currentPage,
            })}
          >
            <IconButton
              onClick={handleExport.bind(null, currentPage)}
              color="error"
            >
              <MenuBookIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Show.Else>
    </Show>
  );
};

export default TableExportButton;
