import { useEffect, useState } from "react";
import style from "./TopMenu.module.css";

export const TopMenu = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={style.menuContainer}>
      <p>Logotype</p>
      <p>SearchBar</p>
      <span>{time.toLocaleString()}</span>
      <span id="sessions-counter">0</span>
    </div>
  );
};
