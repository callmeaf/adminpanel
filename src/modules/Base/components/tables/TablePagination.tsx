import { IPaginateModel } from "@/modules/Base/models/Paginate";
import {
  Grid2,
  Pagination,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import Select from "../forms/Select";
import { useTranslations } from "next-intl";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";
import { ITableProps } from "./Table";

export type TOnPageChange = (page: number) => void;

export type TOnPerPageChange = (perPage: number) => void;

interface ITablePaginationProps {
  tableId: ITableProps["id"];
  paginate: IPaginateModel;
  onPageChange: TOnPageChange;
  onPerPageChange: TOnPerPageChange;
  perPageValue?: string;
}

const perPageDefault = `${process.env.NEXT_PUBLIC_PER_PAGE_DEFAULT}`;

const perPages = [
  {
    id: perPageDefault,
    label: perPageDefault,
    value: perPageDefault,
  },
  {
    id: "30",
    label: "30",
    value: "30",
  },
  {
    id: "60",
    label: "60",
    value: "60",
  },
  {
    id: "100",
    label: "100",
    value: "100",
  },
];

const TablePagination: React.FC<ITablePaginationProps> = ({
  tableId,
  paginate,
  onPageChange,
  onPerPageChange,
  perPageValue,
}) => {
  const theme = useTheme();
  const isDesktopDevice = useMediaQuery(theme.breakpoints.up("sm"));

  const t = useTranslations("Base.Components.Table");

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    localStorageArtisan.update(
      tableId,
      {
        page,
      },
      true
    );

    onPageChange(page);
  };

  const handlePerPageChange = (e: SelectChangeEvent<unknown>) => {
    const value = Number(e.target.value);

    localStorageArtisan.update(
      tableId,
      {
        per_page: value,
        page: 1,
      },
      true
    );

    onPerPageChange(value);
  };

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, lg: 11 }}>
        <Pagination
          count={paginate.lastPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          siblingCount={isDesktopDevice ? undefined : 0}
          boundaryCount={isDesktopDevice ? undefined : 0}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 1 }}>
        <Select
          // @ts-ignore
          onChange={handlePerPageChange}
          label={t("per_page_label")}
          name="per_page"
          size={"small"}
          variant="standard"
          options={perPages}
          value={perPageValue}
          hasEmptyOption={false}
        />
      </Grid2>
    </Grid2>
  );
};

export default TablePagination;
