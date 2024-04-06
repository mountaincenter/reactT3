import React, { useState, useRef, useEffect } from "react";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";
import { Pencil, Trash2, Save, CircleX } from "lucide-react";
import type { TimeLog } from "~/server/types";
import useDateTimeFormat from "~/hooks/useDateTimeFormat";
import { TableCell, TableRow } from "~/components/ui/table";

import InputFormTest from "~/components/InputFormTest";

interface TimeLogItemProps {
  timeLog: TimeLog;
}

const TimeLogItem: React.FC<TimeLogItemProps> = ({ timeLog }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedStartTime, setEditedStartTime] = useState(
    timeLog.startTime.toISOString().slice(0, 16),
  );
  const [editedStopTime, setEditedStopTime] = useState(
    timeLog.stopTime.toISOString().slice(0, 16),
  );

  const [editedRecordTime, setEditedRecordTime] = useState<number>(
    timeLog.recordTime,
  );
  const { updateTimeLog, deleteTimeLog, isLoading } = useTimeLogMutation();
  const { formatDate, formatTime, formatStopTime, formatRecordTime } =
    useDateTimeFormat();

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const roundToNearestMinute = (date: Date) => {
    return new Date(Math.floor(date.getTime() / 60000) * 60000);
  };

  const handleSave = async () => {
    if (!isLoading) {
      const updatedStartTime = new Date(editedStartTime);
      const updatedStopTime = new Date(editedStopTime);

      const roundedStartTime = roundToNearestMinute(updatedStartTime);
      const roundedStopTime = roundToNearestMinute(updatedStopTime);
      const recordTimeInMinutes =
        (roundedStopTime.getTime() - roundedStartTime.getTime()) / 60000;
      setEditedRecordTime(recordTimeInMinutes);

      const updatedTimeLog = {
        id: timeLog.id,
        data: {
          startTime: updatedStartTime,
          stopTime: updatedStopTime,
          recordTime: editedRecordTime,
        },
      };
      updateTimeLog.mutate(updatedTimeLog);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!isLoading) {
      deleteTimeLog.mutate({ id: timeLog.id });
    }
  };

  const handleCancel = async () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const cursorStyle = isLoading ? "cursor-wait" : "cursor-pointer";

  console.log(isLoading);
  return (
    <>
      <TableRow key={timeLog.id}>
        <TableCell className="text-right">
          {formatDate(timeLog.startTime)}
        </TableCell>
        {isEditing ? (
          <TableCell>
            <input
              type="datetime-local"
              value={editedStartTime.slice(0, 16)}
              onChange={(e) => setEditedStartTime(e.target.value)}
            />
          </TableCell>
        ) : (
          <TableCell className="text-right">
            {formatTime(timeLog.startTime)}
          </TableCell>
        )}
        {isEditing ? (
          <TableCell>
            <input
              type="datetime-local"
              value={editedStopTime.slice(0, 16)}
              onChange={(e) => setEditedStopTime(e.target.value)}
            />
          </TableCell>
        ) : (
          <TableCell className="text-right">
            {formatStopTime(timeLog.startTime, timeLog.stopTime)}
          </TableCell>
        )}
        <TableCell className="text-right">
          {formatRecordTime(timeLog.recordTime)}
        </TableCell>
        <TableCell>終了</TableCell>
        <TableCell>
          <div>
            {isEditing ? (
              <Save
                size={16}
                className={`${cursorStyle} hover:text-blue-500`}
                onClick={handleSave}
              />
            ) : (
              <Pencil
                size={16}
                className="cursor-pointer hover:text-green-500"
                onClick={handleEdit}
              />
            )}
          </div>
        </TableCell>
        <TableCell>
          <>
            {isEditing ? (
              <CircleX
                size={16}
                className="cursor-pointer hover:text-red-500"
                onClick={handleCancel}
              />
            ) : (
              <Trash2
                size={16}
                className={`${cursorStyle} hover:text-red-500`}
                onClick={handleDelete}
              />
            )}
          </>
        </TableCell>
      </TableRow>
      <InputFormTest timeLog={timeLog} />
    </>
  );
};

export default TimeLogItem;
