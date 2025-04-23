import { useEffect, useState } from "react";

type TTimer = (
  initialSecond: number,
  options?: {
    handleTimeFormat?: (time: number) => string;
  }
) => {
  time: number;
  timeFormat: string;
  done: boolean;
  reset: () => void;
};

let timeInterval: NodeJS.Timeout;

const useTimer: TTimer = (initialSecond, options) => {
  const [time, setTime] = useState(initialSecond);

  useEffect(() => {
    if (time <= 0) {
      return;
    }
    timeInterval = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timeInterval);
  }, [time]);

  const timeFormat = () => {
    if (options?.handleTimeFormat) {
      return options.handleTimeFormat(time);
    }
    const mins = Math.floor(time / 60);
    const seconds = time % 60;

    return `${mins}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleReset = () => {
    setTime(initialSecond);
  };

  return {
    time,
    timeFormat: timeFormat(),
    done: time <= 0,
    reset: handleReset,
  };
};

export default useTimer;
