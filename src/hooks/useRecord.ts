import { useState, useEffect } from "react";

const useRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const totalSeconds = (now.getTime() - startTime.getTime()) / 1000;
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
    setIsRecording(false);
    setStopTime(new Date());
    setProgress(0);
  };

  const calculateRecordTime = (start: Date | null, stop: Date | null) => {
    if (!start || !stop) return "";

    const diff = stop.getTime() - start.getTime();
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor(diff / 1000 / 60 / 60);

    return `${hours ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatStartTime = (date: Date | null) => {
    if (date === null) return "";
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  };

  return {
    isRecording,
    startTime,
    stopTime,
    elapsedTime,
    progress,
    startRecording,
    stopRecording,
    calculateRecordTime,
    formatStartTime,
  };
};

export default useRecord;
