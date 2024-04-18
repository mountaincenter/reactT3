import {
  format,
  differenceInCalendarDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  differenceInMinutes,
} from "date-fns";

import { z } from "zod";

import type { TimeLog } from "~/server/types";

export const roundedToNearestMinute = (time: Date): Date => {
  return setMilliseconds(setSeconds(time, 0), 0);
};

export const fromHmmToDate = (timeStr: string, baseDate: Date): Date => {
  const hours = parseInt(timeStr.slice(-4, -2) || "0", 10);
  const minutes = parseInt(timeStr.slice(-2), 10);

  const date = setMinutes(setHours(new Date(baseDate), hours), minutes);

  return date;
};

export const fromMinutesToHHmm = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes % 60).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export const fomatStopTimeWihtDayExtension = (
  startTime: Date,
  stopTime: Date,
): string => {
  const dayDifference = differenceInCalendarDays(stopTime, startTime);
  const hours = stopTime.getHours() + dayDifference * 24;
  const minutes = stopTime.getMinutes();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

export const calculateRecordTime = (
  startTime: Date,
  stopTime: Date,
): number => {
  return differenceInMinutes(stopTime, startTime);
};

export const timeSchema = z
  .object({
    inputStartTime: z
      .string()
      .refine((val) => /^([0-9]|0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/.test(val), {
        message: "Invalid start time format",
      }),
    inputStopTime: z
      .string()
      .refine(
        (val) =>
          /^([0-9]|0[0-9]|1[0-9]|2[0-3]|[0-3][0-9]|4[0-7])([0-5][0-9])$/.test(
            val,
          ),
        {
          message: "Invalid stop time format",
        },
      ),
  })
  .refine(
    (data) => {
      const startTime = fromHmmToDate(data.inputStartTime, new Date());
      const stopTime = fromHmmToDate(data.inputStopTime, new Date());
      return startTime <= stopTime;
    },
    {
      message: "Start time must be earlier than or equal to stop time",
      path: ["inputStartTime"],
    },
  );

export interface DisplayTimes {
  displayDate: string;
  displayStartTime: string;
  inputStartTime: string;
  displayStopTime: string;
  displayRecordTime: string;
  inputStopTime: string;
}

export const getDisplayTimes = (timeLog: TimeLog): DisplayTimes => {
  const displayDate = format(timeLog.startTime, "MM/dd");
  const displayStartTime = format(timeLog.startTime, "HH:mm");
  const displayRecordTime = fromMinutesToHHmm(timeLog.recordTime);
  const inputStartTime = format(timeLog.startTime, "HHmm");
  const displayStopTime = fomatStopTimeWihtDayExtension(
    timeLog.startTime,
    timeLog.stopTime,
  );
  const inputStopTime = format(timeLog.stopTime, "HHmm");

  return {
    displayDate,
    displayStartTime,
    inputStartTime,
    displayStopTime,
    displayRecordTime,
    inputStopTime,
  };
};
