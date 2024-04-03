import { api } from "~/utils/api";
import KeepRecordButton from "./KeepRecordButton";
import TimeLogTable from "./TimeLogTable";
import useRecord from "~/hooks/useRecord";

const TimeLogCompoenent = () => {
  const { data: timeLogs = [] } = api.timeLog.list.useQuery();

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
      />
      <TimeLogTable
        timeLogs={timeLogs}
        startTime={startTime}
        stopTime={stopTime}
      />
    </>
  );
};

export default TimeLogCompoenent;
