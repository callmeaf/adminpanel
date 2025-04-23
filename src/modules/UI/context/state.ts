import { VariantType } from "notistack";

export interface IUiState {
  snackbar?: {
    message: string;
    type: VariantType;
  };
}

export default {
  snackbar: undefined,
} as IUiState;
