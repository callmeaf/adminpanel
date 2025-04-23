import * as React from "react";
import Paper from "@mui/material/Paper";
import TableMUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Grid2 } from "@mui/material";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";
import { defaultTableParams } from "../../helpers/table";
import TableLoading from "../Loading/TableLoading";

export interface ITableProps {
  id: string;
  columns: {
    id: string;
    label: string;
  }[];
  pagination?: React.ReactNode;
  loading: boolean;
  search?: React.ReactNode;
  exporter?: React.ReactNode;
  dates?: React.ReactNode;
  filter: React.ReactNode;
}

const Table: React.FC<React.PropsWithChildren<ITableProps>> = ({
  columns,
  children,
  pagination,
  loading,
  id,
  search,
  exporter,
  dates,
  filter,
}) => {
  React.useEffect(() => {
    if (localStorageArtisan.isEmpty(id)) {
      localStorageArtisan.set(id, defaultTableParams(), true);
    }
  }, [id]);

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: 0,
        minHeight: "400px",
      }}
    >
      <TableContainer sx={{ maxHeight: 600, mb: 5, minHeight: "400px" }}>
        <TableLoading open={loading} />
        <Grid2
          container
          spacing={2}
          justifyContent={"space-between"}
          mt={2}
          mb={5}
        >
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <Box display={{ sm: "initial", lg: "flex" }} gap={1}>
              {search}

              {filter}
              {exporter}
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 6 }} justifyItems={"end"}>
            {dates}
          </Grid2>
        </Grid2>
        <TableMUI stickyHeader aria-label="sticky table" id={id}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </TableMUI>
      </TableContainer>
      {pagination}
    </Paper>
  );
};

export default Table;
