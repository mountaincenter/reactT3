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

  const formatStopTime = (startTime: Date, stopTime: Date) => {
    if (!stopTime) return "-";
    const isNextDay =
      stopTime.getDate() > startTime.getDate() ||
      stopTime.getMonth() > startTime.getMonth() ||
      stopTime.getFullYear() > startTime.getFullYear();

    let hours = stopTime.getHours();

    const minutes = String(stopTime.getMinutes()).padStart(2, "0");
    if (isNextDay) {
      hours += 24;
    }

    const formattedHours = String(hours).padStart(2, "0");

    return `${formattedHours}:${minutes}`;
  };

  const formatRecordTime = (seconds: number) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);

    if (seconds % 60 > 0) {
      minutes += 1;
    }

    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  if (!timeLogs) return null;

  return (
    <Table>
      <TableCaption>Time Log</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>日付</TableHead>
          <TableHead>開始時刻</TableHead>
          <TableHead>終了時刻</TableHead>
          <TableHead>経過時間</TableHead>
          <TableHead>状態</TableHead>
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
            <TableCell>進行中</TableCell>
          </TableRow>
        )}
        {timeLogs.map((timeLog: TimeLog, index: number) => {
          return (
            <TableRow key={index}>
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TimeLogTable;
