import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

interface ITableLoadingProps {
  open?: boolean;
}

const TableLoading: React.FC<ITableLoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default TableLoading;
