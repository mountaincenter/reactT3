import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TimeLog } from "~/server/types";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";
import {
  calculateRecordTime,
  fomatStopTimeWihtDayExtension,
  fromHmmToDate,
  getDisplayTimes,
  type DisplayTimes,
} from "~/utils/timeUtils";

type Inputs = {
  startTime: string;
  stopTime: string;
  recoreTime: number;
};

interface AppPrismaRefProps {
  timeLog: TimeLog;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  selectedEdit: "startTime" | "stopTime" | null;
  setSelectedEdit: (selectedEdit: "startTime" | "stopTime" | null) => void;
}

export default function AppPrismaRef({
  timeLog,
  isEdit,
  setIsEdit,
  selectedEdit,
  setSelectedEdit,
}: AppPrismaRefProps) {
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

  const formatTime = (time: string): string => {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2);
    return `${hours}:${minutes}`;
  };

  const formatStopTime = (startTime: string, stopTime: string): string => {
    const startDate = fromHmmToDate(startTime, timeLog.startTime);
    const stopDate = fromHmmToDate(stopTime, timeLog.stopTime);
    return fomatStopTimeWihtDayExtension(startDate, stopDate);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        if (selectedEdit === "stopTime") {
          setSelectedEdit("startTime");
        } else if (selectedEdit === "startTime") {
          setSelectedEdit("stopTime");
        }
      } else {
        if (selectedEdit === "startTime") {
          setSelectedEdit("stopTime");
          e.preventDefault();
        } else if ("inputStopTime") {
          void handleSubmit(onSubmit)();
        }
      }
    }
  };

  console.log(watchedData);
  console.log(inputStartTime);
  console.log(timeLog);
  return (
    <div>
      <h2>TimeLogの編集を実装</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-4 border-white p-4"
      >
        <div className="flex gap-16">
          {isEdit ? (
            <div className="flex gap-4">
              <input
                {...register("startTime")}
                className="text-xl"
                placeholder={watchedData.startTime}
                onKeyDown={handleKeyDown}
                onClick={() => setSelectedEdit("startTime")}
              />
              <input
                {...register("stopTime")}
                className="text-xl"
                placeholder={watchedData.stopTime}
                onKeyDown={handleKeyDown}
                onClick={() => setSelectedEdit("stopTime")}
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <p
                className="cursor-pointer text-xl"
                onClick={() => {
                  setIsEdit(true);
                  setSelectedEdit("startTime");
                }}
              >
                {formatTime(watchedData.startTime)}
              </p>
              <p
                className="cursor-pointer text-xl"
                onClick={() => {
                  setIsEdit(true);
                  setSelectedEdit("stopTime");
                }}
              >
                {formatStopTime(watchedData.startTime, watchedData.stopTime)}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
