import React, { useState, useEffect } from "react";
import TextAtom from "./atoms/Text/TextAtom";

const Today = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const year = String(now.getFullYear());
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      const weekday = weekdays[now.getDay()];
      setToday(`${year}年${month}月${day}日(${weekday})`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <TextAtom size="medium">{today}</TextAtom>;
};

export default Today;
