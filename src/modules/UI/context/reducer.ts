import { SET_SNACKBAR } from "./action-types";
import { IUiState } from "./state";

interface ISET_SNACKBAR {
  type: typeof SET_SNACKBAR;
  payload: NonNullable<IUiState["snackbar"]>;
}

export type TUiAction = ISET_SNACKBAR;

type TUiReducer = (state: IUiState, action: TUiAction) => IUiState;

const uiReducer: TUiReducer = (state, action) => {
  switch (action.type) {
    case SET_SNACKBAR: {
      return {
        ...state,
        snackbar: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;
