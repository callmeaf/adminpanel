import * as React from "react";
import {
  FilterAlt as FilterAltIcon,
  Check as CheckIcon,
  NotInterested as NotInterestedIcon,
} from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Tooltip } from "@mui/material";
import { ITableProps } from "./Table";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";
import { useTranslations } from "next-intl";

export type TOnFilter = () => void;

interface ITableFilterProps {
  tableId: ITableProps["id"];
  onFilter: TOnFilter;
}

const TableFilter: React.FunctionComponent<
  React.PropsWithChildren<ITableFilterProps>
> = ({ tableId, onFilter, children }) => {
  const t = useTranslations("Base.Components.Table");

  const [showFilter, setShowFilter] = React.useState(false);

  const toggleShowFilter = () => setShowFilter(!showFilter);
  const filterRef = React.useRef<null | HTMLDivElement>(null);

  const [dataFiltered, setDataFiltered] = React.useState(false);

  const handleFilter = (
    clean: undefined | boolean | React.MouseEvent<any> = false
  ) => {
    if (filterRef.current) {
      const elements = Array.from(
        filterRef.current.querySelectorAll("input, select")
      ) as (HTMLInputElement | HTMLSelectElement)[];

      localStorageArtisan.update(
        tableId,
        elements.reduce(
          (prev, current) => ({
            ...prev,
            [current.name.replace("_hidden", "")]:
              clean === true ? "" : current.value,
          }),
          {}
        ),
        true
      );

      if (clean !== true) {
        handleCheckDataFiltered();
      }
    }
    onFilter();
    setShowFilter(false);
  };

  const handleClean = () => {
    handleFilter(true);
    setDataFiltered(false);
  };

  const handleCheckDataFiltered = () => {
    if (filterRef.current) {
      const elements = Array.from(
        filterRef.current.querySelectorAll("input, select")
      ) as (HTMLInputElement | HTMLSelectElement)[];
      setDataFiltered(elements.filter((element) => element.value).length !== 0);
    } else {
      setDataFiltered(false);
    }
  };
  React.useEffect(() => {
    handleCheckDataFiltered();
  }, []);

  return (
    <Box position={"relative"}>
      <Tooltip
        title={
          dataFiltered ? t("data_filtered_tooltip") : t("filter_btn_label")
        }
      >
        <IconButton onClick={toggleShowFilter}>
          <FilterAltIcon />
          {dataFiltered && (
            <Badge badgeContent={"!"} sx={{ color: "red", scale: 1.5 }} />
          )}
        </IconButton>
      </Tooltip>

      <Box
        position={"absolute"}
        boxShadow={2}
        zIndex={99}
        bgcolor={"white"}
        minWidth={300}
        minHeight={300}
        ref={filterRef}
        padding={1}
        display={showFilter ? "flex" : "none"}
        flexDirection={"column"}
      >
        {children}
        <Box flexGrow={1} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Tooltip title={t("filter_btn_label")}>
            <Button onClick={handleFilter} color="primary" variant="contained">
              <CheckIcon />
            </Button>
          </Tooltip>
          <Tooltip title={t("clean_filter_btn_label")}>
            <IconButton onClick={handleClean}>
              <NotInterestedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default TableFilter;
