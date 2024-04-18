import React, { useState, useEffect } from "react";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";
import type { TimeLog } from "~/server/types";
import { TableCell, TableRow } from "~/components/ui/table";
import {
  fromMinutesToHHmm,
  getDisplayTimes,
  type DisplayTimes,
} from "~/utils/timeUtils";
import TimeLogForm from "./TimeLogForm";
import TimeLogActions from "./TimeLogActions";

interface TimeLogItemProps {
  timeLog: TimeLog;
}

type SelectedEdit = "inputStartTime" | "inputStopTime" | null;

const TimeLogItem: React.FC<TimeLogItemProps> = ({ timeLog }) => {
  const [selectedEdit, setSelectedEdit] = useState<SelectedEdit>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTimeLog, deleteTimeLog, isLoading } = useTimeLogMutation();
  const { displayDate, displayStartTime, displayStopTime }: DisplayTimes =
    getDisplayTimes(timeLog);

  const onSubmit = async (data: {
    inputStartTime: string;
    inputStopTime: string;
  }) => {
    const { inputStartTime, inputStopTime } = data;
    const updatedStartTime = fromHmmToDate(inputStartTime, timeLog.startTime);
    const updatedStopTime = fromHmmToDate(inputStopTime, timeLog.stopTime);

    const recordTime = calculateRecordTime(updatedStartTime, updatedStopTime);

    await updateTimeLog.mutateAsync({
      id: timeLog.id,
      data: {
        startTime: updatedStartTime,
        stopTime: updatedStopTime,
        recordTime,
      },
    });

    setSelectedEdit(null);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleFormClick = (e: MouseEvent) => {
      if (
        selectedEdit &&
        e.target instanceof HTMLElement &&
        !e.target.closest("form")
      ) {
        setSelectedEdit(null);
      }
    };

    document.addEventListener("click", handleFormClick);

    return () => {
      document.removeEventListener("click", handleFormClick);
    };
  }, [selectedEdit]);

  const handleEdit = () => {
    setIsEditing(true);
    setSelectedEdit("inputStartTime");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedEdit(null);
  };

  const handleDelete = () => {
    if (!isLoading) {
      deleteTimeLog.mutate({ id: timeLog.id });
    }
  };

  return (
    <TableRow key={timeLog.id}>
      <TableCell className="text-right">{displayDate}</TableCell>
      <TimeLogForm
        defaultValues={{
          inputStartTime: displayStartTime,
          inputStopTime: displayStopTime,
        }}
        onSubmit={onSubmit}
        selectedEdit={selectedEdit}
        setSelectedEdit={setSelectedEdit}
      />
      <TableCell className="text-right">
        {fromMinutesToHHmm(timeLog.recordTime)}
      </TableCell>
      <TableCell>終了</TableCell>
      <TimeLogActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={onSubmit}
        onCancel={handleCancel}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </TableRow>
  );
};

export default TimeLogItem;
