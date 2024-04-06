import type { TimeLog } from "~/server/types";
import { LoaderCircle } from "lucide-react";
import TimeLogItem from "~/components/TimeLogItem";
import useDateTimeFormat from "~/hooks/useDateTimeFormat";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface TimeLogsProps {
  timeLogs: TimeLog[];
  startTime: Date | null;
  stopTime: Date | null;
  isLoading: boolean;
}

const TimeLogTable: React.FC<TimeLogsProps> = ({
  timeLogs,
  startTime,
  stopTime,
  isLoading,
}) => {
  const { formatDate, formatTime } = useDateTimeFormat();

  if (!timeLogs) return null;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="relative h-[300px] overflow-y-auto sm:h-[500px]">
      <Table>
        <TableCaption>Time Log</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>日付</TableHead>
            <TableHead>開始時刻</TableHead>
            <TableHead>終了時刻</TableHead>
            <TableHead>経過時間</TableHead>
            <TableHead>状態</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
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
          {timeLogs.map((timeLog: TimeLog) => {
            return <TimeLogItem key={timeLog.id} timeLog={timeLog} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimeLogTable;
