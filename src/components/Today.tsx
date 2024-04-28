import React, { useState, useEffect } from "react";
import TextAtom from "./atoms/Text/TextAtom";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

const Today = () => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = format(now, "yyyy年MM月dd日(EEE)", { locale: ja });
      setToday(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <TextAtom size="medium">{today}</TextAtom>
    </>
  );
};

export default Today;
