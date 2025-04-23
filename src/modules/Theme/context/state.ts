export interface IThemeState {
  mode: "dark" | "light";
}

export default {
  mode: process.env.NEXT_PUBLIC_DEFAULT_THEME_MODE,
} as IThemeState;
