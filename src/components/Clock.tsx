import React, { useState, useEffect } from "react";
import TextAtom from "./atoms/Text/TextAtom";
import { format } from "date-fns";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = format(now, "HH:mm:ss");
      // const hours = String(now.getHours()).padStart(2, "0");
      // const minutes = String(now.getMinutes()).padStart(2, "0");
      // const seconds = String(now.getSeconds()).padStart(2, "0");

      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <TextAtom size="large">{time}</TextAtom>;
};

export default Clock;
