import React, { useState, useEffect } from "react";
import AppTimeLog from "./FormExampleTimeLog";

import { api } from "~/utils/api";

const ReactHookForm = () => {
  const { data: timeLogs } = api.timeLog.list.useQuery();
  const timeLog = timeLogs?.[0];

  const [isEdit, setIsEdit] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<
    "startTime" | "stopTime" | null
  >(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("input")) {
        setIsEdit(false);
        setSelectedEdit(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-12">
        {timeLog && (
          <AppTimeLog
            timeLog={timeLog}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedEdit={selectedEdit}
            setSelectedEdit={setSelectedEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ReactHookForm;
