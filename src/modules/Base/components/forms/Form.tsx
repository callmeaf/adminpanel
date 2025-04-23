import { Button, Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";
import Show from "../common/Show";

interface IFormProps {
  loading?: boolean;
  t?: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitBtnLabel?: string;
  submitBtn?: React.ReactNode;
  inStepper?: boolean;
}

export interface IForm {
  onSubmit: ({}: any) => void;
  loading: boolean;
}

const FormChild = (child: React.ReactElement) => {
  if (child.type === Grid2) {
    return child;
  }

  return (
    <Grid2 key={child.key} size={{ xs: 12, md: 6, lg: 4 }}>
      {child}
    </Grid2>
  );
};

const Form: React.FC<React.PropsWithChildren<IFormProps>> = ({
  children,
  t,
  loading,
  onSubmit,
  submitBtnLabel,
  submitBtn,
  inStepper,
}) => {
  t = t ?? useTranslations("Base.Forms.Form");

  return (
    <form onSubmit={onSubmit}>
      <Grid2 container spacing={2}>
        {React.Children.toArray(children).map((child) =>
          FormChild(child as React.ReactElement)
        )}
        <Show when={submitBtn === undefined}>
          <Show.When>
            <Grid2
              size={12}
              position={inStepper ? "absolute" : "initial"}
              right={inStepper ? "0" : ""}
              bottom={inStepper ? "0" : ""}
              width={inStepper ? "fit-content" : "initial"}
            >
              <Button type={"submit"} variant={`contained`} loading={loading}>
                {submitBtnLabel ??
                  (inStepper
                    ? t("stepper_submit_btn_label")
                    : t("submit_btn_label"))}
              </Button>
            </Grid2>
          </Show.When>
          <Show.Else>{submitBtn}</Show.Else>
        </Show>
      </Grid2>
    </form>
  );
};

export default Form;
