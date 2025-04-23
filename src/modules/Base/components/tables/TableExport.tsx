import * as React from "react";
import { FileUpload as FileUploadIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import TableExportButton from "./export/TableExportButton";
import { ITableProps } from "./Table";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";

export enum ExportType {
  EXCEL = "excel",
}

export type TOnExport = (
  type: ExportType,
  {}: {
    page: number | "all";
  }
) => void;

interface ITableExportProps {
  tableId: ITableProps["id"];
  types?: ExportType[];
  onExport: TOnExport;
}

const TableExport: React.FC<ITableExportProps> = ({
  tableId,
  onExport,
  types,
}) => {
  const t = useTranslations("Base.Components.Table");
  const [showFilter, setShowFilter] = React.useState(false);

  const toggleShowFilter = () => setShowFilter(!showFilter);
  const exportRef = React.useRef<null | HTMLDivElement>(null);

  if (!types) {
    types = Object.values(ExportType);
  }

  const config = localStorageArtisan.get(tableId, true) ?? {};
  return (
    <Box position={"relative"}>
      <Tooltip title={t("export_data_tooltip")}>
        <IconButton onClick={toggleShowFilter}>
          <FileUploadIcon />
        </IconButton>
      </Tooltip>

      <Box
        position={"absolute"}
        boxShadow={2}
        zIndex={99}
        bgcolor={"white"}
        minWidth={300}
        minHeight={300}
        ref={exportRef}
        padding={1}
        display={showFilter ? "flex" : "none"}
        flexDirection={"column"}
      >
        {types.map((type) => (
          <TableExportButton
            key={type}
            type={type}
            onExport={onExport}
            currentPage={config.page}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TableExport;
