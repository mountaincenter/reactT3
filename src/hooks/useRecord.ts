import { useState, useEffect } from "react";
import { useTimeLogMutation } from "./useTimeLogMutation";
import { useSession } from "next-auth/react";
import { differenceInSeconds, differenceInMinutes } from "date-fns";

import { roundedToNearestMinute } from "~/utils/timeUtils";

const useRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00");
  const [progress, setProgress] = useState<number>(0);
  const { data: session } = useSession();
  const { createTimeLog } = useTimeLogMutation();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const totalSeconds = differenceInSeconds(now, startTime);
        const hours = Math.floor(totalSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((totalSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");

        setElapsedTime(`${hours}:${minutes}`);

        const progressPercentage = (totalSeconds / 1500) * 100;
        setProgress(progressPercentage);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, startTime]);

  const startRecording = () => {
    setIsRecording(true);
    setStartTime(new Date());
    setStopTime(null);
  };

  const stopRecording = () => {
    const stop = roundedToNearestMinute(new Date());
    setIsRecording(false);
    setStopTime(stop);
    setProgress(0);
    if (session?.user?.id && startTime) {
      const roundedStartTime = roundedToNearestMinute(startTime);
      const recordTime = differenceInMinutes(stop, roundedStartTime);
      createTimeLog.mutate({
        startTime,
        stopTime: stop,
        recordTime,
        status: "finished",
        isActive: true,
      });
    }
  };

  return {
    isRecording,
    startTime,
    stopTime,
    elapsedTime,
    progress,
    startRecording,
    stopRecording,
  };
};

export default useRecord;
