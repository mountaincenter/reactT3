import React, { useState, useEffect, useRef } from "react";
import type { TimeLog } from "~/server/types";
import { TableCell } from "~/components/ui/table";
import { format } from "date-fns";
import {
  fromMinutesToHHmm,
  fomatStopTimeWihtDayExtension,
} from "~/utils/timeUtils";

interface InputFormReactHookFormProps {
  timeLog: TimeLog;
}

const InputFormReactHookForm: React.FC<InputFormReactHookFormProps> = ({
  timeLog,
}) => {
  const startTime = timeLog.startTime;
  const stopTime = timeLog.stopTime;
  const [startTimeInput, setStartTimeInput] = useState("");
  const [tempStartInput, setTempStartInput] = useState(
    format(startTime, "HHmm"),
  );
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEdit) {
      setStartTimeInput(tempStartInput);
    }
  }, [isEdit, tempStartInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 4) {
      setTempStartInput(inputValue);
    }
  };

  // Enterキーが押されたときに編集モードを終了します。
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsEdit(false);
        if (!tempStartInput) {
          setTempStartInput(format(startTime, "HHmm"));
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, startTime, tempStartInput]);

  const convertToDisplayFormat = (input: string) => {
    const paddedInput = input.padStart(4, "0");
    const hours = paddedInput.slice(0, 2);
    const minutes = paddedInput.slice(2);
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <TableCell>{format(startTime, "MM/dd")}</TableCell>
      {isEdit ? (
        <TableCell className="text-right">
          <input
            type="text"
            ref={inputRef}
            value={tempStartInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            autoFocus
            maxLength={4}
            className="text w-12 pl-1"
          />
        </TableCell>
      ) : (
        <TableCell
          className="cursor-pointer text-right"
          onClick={() => setIsEdit(true)}
        >
          {convertToDisplayFormat(startTimeInput)}
        </TableCell>
      )}
      <TableCell className="text-right">
        {fomatStopTimeWihtDayExtension(stopTime, startTime)}
      </TableCell>
      <TableCell className="text-right">
        {fromMinutesToHHmm(timeLog.recordTime)}
      </TableCell>
    </>
  );
};

export default InputFormReactHookForm;
