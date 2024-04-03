import React from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

import TextAtom from "./atoms/Text/TextAtom";

interface KeepRecordButtonProps {
  isRecording: boolean;
  elapsedTime: string;
  progress: number | null;
  startRecording: () => void;
  stopRecording: () => void;
}

const KeepRecordButton: React.FC<KeepRecordButtonProps> = ({
  isRecording,
  elapsedTime,
  progress,
  startRecording,
  stopRecording,
}) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-8">
        <Button
          onClick={startRecording}
          disabled={isRecording}
          className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Start
        </Button>
        <Button
          variant="destructive"
          onClick={stopRecording}
          disabled={!isRecording}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Stop
        </Button>
      </div>
      <TextAtom size="small">Elapsed Time: {elapsedTime}</TextAtom>
      <Progress value={progress} max={100}></Progress>
    </div>
  );
};

export default KeepRecordButton;
