"use client";

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import themeState, { IThemeState } from "./state";
import themeReducer, { TThemeAction } from "./reducer";
import { ThemeProvider as ThemeProviderMUI } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "../helpers/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { SET_THEME_MODE } from "./action-types";
import { localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";

interface IThemeContext {
  state: IThemeState;
  dispatch: Dispatch<TThemeAction>;
}

export const ThemeContext = createContext<IThemeContext>({
  state: themeState,
  dispatch: () => {},
});

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, themeState);
  const { mode } = state;

  useEffect(() => {
    const storedThemeMode = localStorageArtisan.get("themeMode");

    if (storedThemeMode === "light" || storedThemeMode === "dark") {
      dispatch({
        type: SET_THEME_MODE,
        payload: storedThemeMode,
      });
    }
  }, []);

  return (
    <ThemeContext value={{ state, dispatch }}>
      <AppRouterCacheProvider
        options={{
          key: "muirtl",
          stylisPlugins: [stylisRTLPlugin],
        }}
      >
        <ThemeProviderMUI theme={mode === "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProviderMUI>
      </AppRouterCacheProvider>
    </ThemeContext>
  );
};

export default ThemeProvider;
