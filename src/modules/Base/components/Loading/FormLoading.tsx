import { Backdrop, CircularProgress } from "@mui/material";
import * as React from "react";

interface IFormLoadingProps {
  open?: boolean;
}

const FormLoading: React.FC<IFormLoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FormLoading;
