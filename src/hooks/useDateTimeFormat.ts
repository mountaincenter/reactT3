import { useMemo } from "react";

const useDateTimeFormat = () => {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const formatTime = (time: Date) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatInputTime = (time: Date) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}${minutes}`;
  };

  const formatStopTime = (startTime: Date, stopTime: Date) => {
    if (!stopTime) return "-";
    const isNextDay =
      stopTime.getDate() > startTime.getDate() ||
      stopTime.getMonth() > startTime.getMonth() ||
      stopTime.getFullYear() > startTime.getFullYear();

    let hours = stopTime.getHours();

    const minutes = String(stopTime.getMinutes()).padStart(2, "0");
    if (isNextDay) {
      hours += 24;
    }

    const formattedHours = String(hours).padStart(2, "0");

    return `${formattedHours}:${minutes}`;
  };

  const formatRecordTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  return useMemo(
    () => ({
      formatDate,
      formatTime,
      formatInputTime,
      formatStopTime,
      formatRecordTime,
    }),
    [],
  );
};

export default useDateTimeFormat;
