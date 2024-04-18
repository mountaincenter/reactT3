import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TimeLog } from "~/server/types";
import { format } from "date-fns";
import { TableCell } from "~/components/ui/table";
import {
  fromHmmToDate,
  calculateRecordTime,
  fomatStopTimeWihtDayExtension,
  timeSchema,
} from "~/utils/timeUtils";
import { zodResolver } from "@hookform/resolvers/zod";

type SelectedEdit = "inputStartTime" | "inputStopTime" | null;

interface FormComponentProps {
  timeLog: TimeLog;
  selectedEdit: SelectedEdit;
  setSelectedEdit: React.Dispatch<React.SetStateAction<SelectedEdit>>;
  onSave: (updatedTimeLog: Partial<TimeLog>) => Promise<void>;
}

interface FormValues {
  inputStartTime: string;
  inputStopTime: string;
  selectedEdit: SelectedEdit;
}

const FormComponent: React.FC<FormComponentProps> = ({
  timeLog,
  selectedEdit,
  setSelectedEdit,
  onSave,
}) => {
  const displayDate = format(timeLog.startTime, "MM/dd");
  const displayStartTime = format(timeLog.startTime, "HH:mm");
  const inputStartTime = format(timeLog.startTime, "HHmm");
  const displayStopTime = fomatStopTimeWihtDayExtension(
    timeLog.startTime,
    timeLog.stopTime,
  );
  const inputStopTime = format(timeLog.stopTime, "HHmm");

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      inputStartTime,
      inputStopTime,
      selectedEdit: null as SelectedEdit,
    },
    resolver: zodResolver(timeSchema),
  });

  const onEditSubmit: SubmitHandler<{
    inputStartTime: string;
    inputStopTime: string;
  }> = async (data) => {
    const { inputStartTime, inputStopTime } = data;
    const updatedStartTime = fromHmmToDate(inputStartTime, timeLog.startTime);
    const updatedStopTime = fromHmmToDate(inputStopTime, timeLog.stopTime);

    if (updatedStartTime >= updatedStopTime) {
      alert("開始時刻は終了時刻より前の時間である必要があります。");
      return;
    }

    const recordTime = calculateRecordTime(updatedStartTime, updatedStopTime);

    await onSave({
      startTime: updatedStartTime,
      stopTime: updatedStopTime,
      recordTime,
    });
  };

  useEffect(() => {
    if (selectedEdit) {
      setFocus(selectedEdit);
      setTimeout(() => {
        const inputElement = document.querySelector<HTMLInputElement>(
          `input[name="${selectedEdit}"]`,
        );
        inputElement?.select();
      }, 0);
    }
  }, [selectedEdit, setFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedEdit === "inputStartTime") {
        setSelectedEdit("inputStopTime");
      } else if (selectedEdit === "inputStopTime") {
        void handleSubmit(onEditSubmit)();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (selectedEdit === "inputStartTime") {
        setSelectedEdit("inputStopTime");
      } else if (selectedEdit === "inputStopTime") {
        setSelectedEdit("inputStartTime");
      }
    }
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      selectedEdit &&
      e.target instanceof HTMLElement &&
      !e.target.closest("form")
    ) {
      void handleSubmit(onEditSubmit)();
    }
  };

  return (
    <div onClick={handleFormClick}>
      <TableCell>{displayDate}</TableCell>
      <TableCell>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          {selectedEdit === "inputStartTime" ? (
            <input
              {...register("inputStartTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span
              onClick={() => setSelectedEdit("inputStartTime")}
              className="cursor-pointer"
            >
              {displayStartTime}
            </span>
          )}
          {errors.inputStartTime && (
            <span className="text-red-500">
              {errors.inputStartTime.message}
            </span>
          )}
        </form>
      </TableCell>
      <TableCell>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          {selectedEdit === "inputStopTime" ? (
            <input
              {...register("inputStopTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span
              onClick={() => setSelectedEdit("inputStopTime")}
              className="cursor-pointer"
            >
              {displayStopTime}
            </span>
          )}
          {errors.inputStopTime && (
            <span className="text-red-500">{errors.inputStopTime.message}</span>
          )}
        </form>
      </TableCell>
      <TableCell>{displayStopTime}</TableCell>
    </div>
  );
};

export default FormComponent;
