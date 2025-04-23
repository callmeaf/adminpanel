import { localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";
import { SET_THEME_MODE } from "./action-types";
import { IThemeState } from "./state";

interface ISET_THEME_MODE {
  type: typeof SET_THEME_MODE;
  payload: NonNullable<IThemeState["mode"]>;
}

export type TThemeAction = ISET_THEME_MODE;

type TThemeReducer = (state: IThemeState, action: TThemeAction) => IThemeState;

const ThemeReducer: TThemeReducer = (state, action) => {
  switch (action.type) {
    case SET_THEME_MODE: {
      localStorageArtisan.set("themeMode", action.payload);

      return {
        ...state,
        mode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default ThemeReducer;
