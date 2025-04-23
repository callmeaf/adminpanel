"use client";

import * as React from "react";
import UiProvider from "@/modules/UI/context/ui-context";
import { SnackbarProvider } from "notistack";
import ThemeProvider from "@/modules/Theme/context/theme-context";

interface IThemeLayoutProps {}

const ThemeLayout: React.FunctionComponent<
  React.PropsWithChildren<IThemeLayoutProps>
> = ({ children }) => {
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <UiProvider>{children}</UiProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default ThemeLayout;
