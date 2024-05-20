import KeepRecordButton from "~/components/TimeLog/KeepRecordButton";
import TimeLogTable from "~/components/TimeLog/TimeLogTable";
import useRecord from "~/hooks/useRecord";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";

const TimeLogCompoenent = () => {
  const { timeLogs, isLoading } = useTimeLogMutation();
  const {
    isRecording,
    startTime,
    stopTime,
    elapsedTime,
    progress,
    startRecording,
    stopRecording,
  } = useRecord();

  return (
    <>
      <KeepRecordButton
        isRecording={isRecording}
        elapsedTime={elapsedTime}
        progress={progress}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isLoading={isLoading}
      />
      <TimeLogTable
        timeLogs={timeLogs}
        startTime={startTime}
        stopTime={stopTime}
        isLoading={isLoading}
      />
    </>
  );
};

export default TimeLogCompoenent;
