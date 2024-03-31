import React, { useState } from "react";
import { Button } from "./ui/button";

import TextAtom from "./atoms/Text/TextAtom";

const KeepRecordButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);

  const onStart = () => {
    setIsRecording(true);
    setStartTime(new Date());
  };

  const onStop = () => {
    setIsRecording(false);
    setStopTime(new Date());
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

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-8">
        <Button
          onClick={onStart}
          disabled={isRecording}
          className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Start
        </Button>
        <Button
          variant="destructive"
          onClick={onStop}
          disabled={!isRecording}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Stop
        </Button>
      </div>
      <TextAtom size="small">Start Time: {formatStartTime(startTime)}</TextAtom>
      <TextAtom size="small">Stop Time: {formatStartTime(stopTime)}</TextAtom>
      <TextAtom size="small">
        Record Time: {calculateRecordTime(startTime, stopTime)}
      </TextAtom>
    </div>
  );
};

export default KeepRecordButton;
