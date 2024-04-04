import React from "react";
import { useTimeLogMutation } from "~/hooks/useTimeLogMutation";
import { Pencil, Trash2 } from "lucide-react";
import type { TimeLog } from "~/server/types";
import useDateTimeFormat from "~/hooks/useDateTimeFormat";
import { TableCell, TableRow } from "~/components/ui/table";

interface TimeLogItemProps {
  timeLog: TimeLog;
}

const TimeLogItem: React.FC<TimeLogItemProps> = ({ timeLog }) => {
  const { updateTimeLog, deleteTimeLog, isDeleteLoading } =
    useTimeLogMutation();
  const { formatDate, formatTime, formatStopTime, formatRecordTime } =
    useDateTimeFormat();

  const handleDelete = async () => {
    if (!isDeleteLoading) {
      deleteTimeLog.mutate({ id: timeLog.id });
    }
  };

  const cursorStyle = isDeleteLoading ? "cursor-wait" : "cursor-pointer";

  return (
    <>
      <TableRow key={timeLog.id}>
        <TableCell className="text-right">
          {formatDate(timeLog.startTime)}
        </TableCell>
        <TableCell className="text-right">
          {formatTime(timeLog.startTime)}
        </TableCell>
        <TableCell className="text-right">
          {formatStopTime(timeLog.startTime, timeLog.stopTime)}
        </TableCell>
        <TableCell className="text-right">
          {formatRecordTime(timeLog.recordTime)}
        </TableCell>
        <TableCell>終了</TableCell>
        <TableCell>
          <Pencil size={16} />
        </TableCell>
        <TableCell>
          <Trash2
            size={16}
            className={`${cursorStyle} hover:text-red-500`}
            onClick={!isDeleteLoading ? handleDelete : undefined}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TimeLogItem;
