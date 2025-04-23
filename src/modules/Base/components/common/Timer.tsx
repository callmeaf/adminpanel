import * as React from "react";
import Show from "./Show";
import { Restore as RestoreIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import useTimer from "@/modules/Base/hooks/use-timer";

interface ITimerProps {
  onReset: VoidFunction;
  resetTooltip: string;
  initialSeconds: number;
}

const Timer: React.FC<ITimerProps> = ({
  onReset,
  resetTooltip,
  initialSeconds,
}) => {
  const { timeFormat, reset, done } = useTimer(initialSeconds);
  const handleReset = () => {
    onReset();
    reset();
  };

  return (
    <Show when={done}>
      <Show.When>
        <Tooltip title={resetTooltip}>
          <IconButton onClick={handleReset}>
            <RestoreIcon />
          </IconButton>
        </Tooltip>
      </Show.When>
      <Show.Else>{timeFormat}</Show.Else>
    </Show>
  );
};

export default Timer;
