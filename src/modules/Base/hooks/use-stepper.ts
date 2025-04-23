import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useRoutes from "./use-routes";

export interface IStep {
  id: string;
  label: string;
  optional?: boolean;
}

export type THandleGoStep = (step: IStep) => void;

type TUseStepper = (initialSteps: IStep[]) => {
  steps: IStep[];
  activeStep: IStep;
  activeStepIndex: number;
  completed: boolean;
  handleNextStep: VoidFunction;
  handleBackStep: VoidFunction;
  handleResetStep: VoidFunction;
  handleGoToList: (routeName: string) => void;
  handleGoStep: THandleGoStep;
};

const useStepper: TUseStepper = (initialSteps) => {
  const t = useTranslations("Base.Components.Stepper");
  const router = useRouter();
  const { getRouteByName } = useRoutes();

  const [steps, setSteps] = useState<IStep[]>([
    ...initialSteps,
    {
      id: "finish",
      label: t("final_step_label"),
    },
  ]);
  const [activeStep, setActiveStep] = useState<IStep>(initialSteps[0]);

  const handleNextStep = () => {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStep.id);

    const nextStep = steps.at(currentStepIndex + 1);
    if (nextStep) {
      setActiveStep(nextStep);
    }
  };

  const handleBackStep = () => {
    const currentStepIndex = steps.findIndex(
      (step) => step.id === activeStep.id
    );

    const backStep = steps.at(currentStepIndex - 1);
    if (backStep) {
      setActiveStep(backStep);
    }
  };

  const handleResetStep = () => {
    setActiveStep(steps[0]);
  };

  const handleGoToList = (routeName: string) => {
    const currentRoute = getRouteByName(routeName);
    if (currentRoute) {
      router.push(currentRoute.href);
    }
  };

  const handleGoStep: THandleGoStep = (step) => {
    const currentStepIndex = steps.findIndex((s) => s.id === step.id);

    const currentStep = steps.at(currentStepIndex);
    if (currentStep) {
      setActiveStep(currentStep);
    }
  };

  const activeStepIndex = steps.findIndex((step) => step.id === activeStep.id);
  const completed = steps.length - 1 === activeStepIndex;

  return {
    steps,
    activeStep,
    activeStepIndex,
    completed,
    handleNextStep,
    handleBackStep,
    handleResetStep,
    handleGoToList,
    handleGoStep,
  };
};

export default useStepper;
