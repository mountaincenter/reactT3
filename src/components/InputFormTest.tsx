import React, { useState, useEffect, useRef } from "react";
import useDateTimeFormat from "~/hooks/useDateTimeFormat";
import type { TimeLog } from "~/server/types";
import { TableCell } from "~/components/ui/table";

interface InputFormTestProps {
  timeLog: TimeLog;
}

const InputFormTest: React.FC<InputFormTestProps> = ({ timeLog }) => {
  console.log(timeLog);
  const startTime = timeLog.startTime;
  const { formatDate, formatTime, formatInputTime, formatRecordTime } =
    useDateTimeFormat();
  const [startTimeInput, setStartTimeInput] = useState("");
  const [tempStartInput, setTempStartInput] = useState(
    formatInputTime(startTime),
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
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsEdit(false);
        if (!tempStartInput) {
          setTempStartInput(formatInputTime(startTime));
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
      <TableCell>{formatDate(startTime)}</TableCell>
      {isEdit ? (
        <TableCell>
          <input
            type="text"
            ref={inputRef}
            value={tempStartInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} // Enterキーの押下を検知します。
            autoFocus
            maxLength={4}
            className="text w-12 pl-1"
          />
        </TableCell>
      ) : (
        <TableCell onClick={() => setIsEdit(true)}>
          {convertToDisplayFormat(startTimeInput)}
        </TableCell>
      )}
      <TableCell>{formatTime(timeLog.stopTime)}</TableCell>
      <TableCell>{formatRecordTime(timeLog.recordTime)}</TableCell>
    </>
  );
};

export default InputFormTest;
