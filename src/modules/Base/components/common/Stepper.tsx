import * as React from "react";
import Box from "@mui/material/Box";
import StepperMUI from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { IStep, THandleGoStep } from "@/modules/Base/hooks/use-stepper";

interface IStepper {
  steps: IStep[];
  activeStep: IStep;
  activeStepIndex: number;
  completed: boolean;
  handleNextStep: VoidFunction;
  handleBackStep: VoidFunction;
  handleResetStep: VoidFunction;
  handleGoToList?: VoidFunction;
  handleGoStep: THandleGoStep;
  clickableStep?: boolean;
}

const Stepper: React.FC<React.PropsWithChildren<IStepper>> = ({
  children,
  steps,
  activeStep,
  activeStepIndex,
  completed,
  handleNextStep,
  handleBackStep,
  handleResetStep,
  handleGoToList,
  handleGoStep,
  clickableStep = false,
}) => {
  const t = useTranslations("Base.Components.Stepper");

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <StepperMUI activeStep={activeStepIndex}>
        {steps.map((step) => {
          return (
            <Step key={step.id} completed={completed}>
              <StepLabel
                onClick={
                  clickableStep ? handleGoStep.bind(null, step) : undefined
                }
                sx={{
                  cursor: clickableStep ? "pointer !important" : "initial",
                }}
                optional={
                  step.optional && (
                    <Typography variant="caption">
                      ( {t("optional_label")} )
                    </Typography>
                  )
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </StepperMUI>
      {completed ? (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box component={"div"}>
              <Typography variant="body2" my={2}>
                {t("all_steps_completed_label")}
              </Typography>
              {handleGoToList && (
                <Button onClick={handleGoToList} variant="contained">
                  {t("go_to_list_btn_label")}
                </Button>
              )}
            </Box>

            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleResetStep}>{t("reset_btn_label")}</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            {React.Children.toArray(children).map((child, index) => (
              <Box key={steps[index].id} hidden={index !== activeStepIndex}>
                {child}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStepIndex === 0}
              onClick={handleBackStep}
              sx={{ mr: 1 }}
            >
              {t("back_btn_label")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep.optional && (
              <Button color="inherit" onClick={undefined} sx={{ mr: 1 }}>
                {t("skip_btn_label")}
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default Stepper;
