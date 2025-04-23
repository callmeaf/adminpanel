"use client";

import { createTheme } from "@mui/material/styles";
import { IRANYekanFont } from "./font";

export const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: `var(${IRANYekanFont.variable})`,
  },
});

export const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: `var(${IRANYekanFont.variable})`,
  },
});
