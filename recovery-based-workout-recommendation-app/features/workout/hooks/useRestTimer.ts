// features/workout/hooks/useRestTimer.ts
import { useEffect, useRef, useState } from "react";

export const useRestTimer = () => {
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isResting && restTime > 0) {
      intervalRef.current = setInterval(() => {
        setRestTime((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            // TODO: Trigger notification
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isResting, restTime]);

  const startRest = (duration: number) => {
    setRestTime(duration);
    setIsResting(true);
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    restTime,
    isResting,
    formattedRestTime: formatTime(restTime),
    startRest,
    skipRest,
  };
};
