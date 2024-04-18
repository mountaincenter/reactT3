import React from "react";
import { getDisplayTimes } from "~/utils/timeUtils";
import type { TimeLog } from "~/server/types";

interface DisplayTimesProps {
  timeLog: TimeLog;
}

const DisplayTimes: React.FC<DisplayTimesProps> = ({ timeLog }) => {
  const { displayDate, displayStartTime, displayStopTime, displayRecordTime } =
    getDisplayTimes(timeLog);
  return (
    <>
      <div className="text-xl">displayDate(月日)：{displayDate}</div>
      <div className="text-xl">
        displayStartTime(開始時刻)：{displayStartTime}
      </div>
      <div className="text-xl">
        displayStopTime(終了時刻)：{displayStopTime}
      </div>
      <div className="text-xl">
        displayRecordTime(経過時間)：{displayRecordTime}
      </div>
    </>
  );
};

export default DisplayTimes;
