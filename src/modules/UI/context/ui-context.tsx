"use client";

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import uiState, { IUiState } from "./state";
import uiReducer, { TUiAction } from "./reducer";
import { useSnackbar } from "notistack";

interface IUiContext {
  state: IUiState;
  dispatch: Dispatch<TUiAction>;
}

export const UiContext = createContext<IUiContext>({
  state: uiState,
  dispatch: () => {},
});

const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, uiState);
  const { snackbar } = state;

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snackbar && snackbar.message) {
      enqueueSnackbar(snackbar.message, { variant: snackbar.type });
    }
  }, [snackbar]);

  return <UiContext value={{ state, dispatch }}>{children}</UiContext>;
};

export default UiProvider;
