import type { TimeLog } from "~/server/types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TimeLogsProps {
  timeLogs: TimeLog[];
  startTime: Date | null;
  stopTime: Date | null;
}

const TimeLogTable: React.FC<TimeLogsProps> = ({
  timeLogs,
  startTime,
  stopTime,
}) => {
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const formatTime = (time: Date) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatRecordTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  if (!timeLogs) return null;

  return (
    <Table>
      <TableCaption>TimeLog Component</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>StartTime</TableHead>
          <TableHead>EndTime</TableHead>
          <TableHead>RecordTime</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {startTime && !stopTime && (
          <TableRow>
            <TableCell className="text-right">
              {formatDate(new Date())}
            </TableCell>
            <TableCell className="text-right">
              {formatTime(startTime)}
            </TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell>progress</TableCell>
          </TableRow>
        )}
        {timeLogs.map((timeLog: TimeLog, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell className="text-right">
                {formatDate(timeLog.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                {formatTime(timeLog.startTime)}
              </TableCell>
              <TableCell className="text-right">
                {formatTime(timeLog.stopTime)}
              </TableCell>
              <TableCell className="text-right">
                {formatRecordTime(timeLog.recordTime)}
              </TableCell>
              <TableCell>{timeLog.status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TimeLogTable;
