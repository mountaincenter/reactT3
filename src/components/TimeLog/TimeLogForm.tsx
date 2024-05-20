import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TableCell } from "~/components/ui/table";
import {
  fromHmmToDate,
  calculateRecordTime,
  formatStopTimeWithDayExtension,
  getDisplayTimes,
  type DisplayTimes,
} from "~/utils/timeUtils";
import type { TimeLog } from "~/server/types";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";

type Inputs = {
  startTime: string;
  stopTime: string;
  recordTime: number;
};
interface TimeLogFormProps {
  timeLog: TimeLog;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  selectedEdit: "startTime" | "stopTime" | null;
  setSelectedEdit: (selectedEdit: "startTime" | "stopTime" | null) => void;
}

const TimeLogForm: React.FC<TimeLogFormProps> = ({
  timeLog,
  isEdit,
  setIsEdit,
  selectedEdit,
  setSelectedEdit,
}) => {
  const { updateTimeLog } = useTimeLogMutation();
  const { inputStartTime, inputStopTime }: DisplayTimes =
    getDisplayTimes(timeLog);
  const { register, handleSubmit, watch, reset, setFocus } = useForm<Inputs>({
    defaultValues: {
      startTime: inputStartTime,
      stopTime: inputStopTime,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateStartTime: Date = fromHmmToDate(
      data.startTime,
      timeLog.startTime,
    );
    const updateStopTime: Date = fromHmmToDate(data.stopTime, timeLog.stopTime);
    const updateRecordTime: number = calculateRecordTime(
      updateStartTime,
      updateStopTime,
    );
    try {
      await updateTimeLog.mutateAsync({
        id: timeLog.id,
        data: {
          startTime: updateStartTime,
          stopTime: updateStopTime,
          recordTime: updateRecordTime,
        },
      });

      setIsEdit(false);
      setSelectedEdit(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const watchedData = watch();

  useEffect(() => {
    if (selectedEdit === "startTime") {
      setFocus("startTime", { shouldSelect: true });
    } else if (selectedEdit === "stopTime") {
      setFocus("stopTime", { shouldSelect: true });
    }
  }, [selectedEdit, setFocus]);

  useEffect(() => {
    reset({ startTime: inputStartTime, stopTime: inputStopTime });
  }, [inputStartTime, inputStopTime, reset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedEdit === "startTime") {
        setSelectedEdit("stopTime");
      } else if (selectedEdit === "stopTime") {
        void handleSubmit(onSubmit)();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (selectedEdit === "startTime") {
        setSelectedEdit("stopTime");
      } else if (selectedEdit === "stopTime") {
        setSelectedEdit("startTime");
      }
    }
  };

  const formatTime = (time: string): string => {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2);
    return `${hours}:${minutes}`;
  };

  const formatStopTime = (startTime: string, stopTime: string): string => {
    const startDate = fromHmmToDate(startTime, timeLog.startTime);
    const stopDate = fromHmmToDate(stopTime, timeLog.stopTime);
    return formatStopTimeWithDayExtension(startDate, stopDate);
  };

  console.log(isEdit);
  return (
    <>
      <TableCell>
        {isEdit ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("startTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          </form>
        ) : (
          <span
            onClick={() => {
              setIsEdit(true);
              setSelectedEdit("startTime");
            }}
            className="cursor-pointer"
          >
            {formatTime(watchedData.startTime)}
          </span>
        )}
      </TableCell>
      <TableCell>
        {isEdit ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("stopTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          </form>
        ) : (
          <span
            onClick={() => {
              setIsEdit(true);
              setSelectedEdit("stopTime");
            }}
            className="cursor-pointer"
          >
            {formatStopTime(watchedData.startTime, watchedData.stopTime)}
          </span>
        )}
      </TableCell>
    </>
  );
};

export default TimeLogForm;
