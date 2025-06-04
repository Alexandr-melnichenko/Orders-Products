import { useEffect, useState } from "react";
import style from "./TopMenu.module.css";
import { Logo } from "../Logo/Logo";
import { io } from "socket.io-client";

export const TopMenu = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [sessionsCount, setSessionsCount] = useState(0);

  console.log("VITE_FRONTEND_URL:", import.meta.env.VITE_FRONTEND_URL);
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("Full import.meta.env:", import.meta.env);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_FRONTEND_URL, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🔗 Подключено к сокету. ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Ошибка подключения:", err.message);
    });

    socket.on("sessions-update", (data) => {
      setSessionsCount(data.count);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Форматирование даты: 12 MAR, 2025
  const formattedDate = time
    .toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  // Форматирование времени: 17:25
  const formattedTime = time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={style.topMenu__menuContainer}>
      <Logo />
      <div className={style.topMenu__rightContainer}>
        <div className={style.topMenu__timeContainer}>
          <span className={style.topMenu__timeText}>
            <span className={style.topMenu__smallGrayText}>Today:</span>{" "}
            {formattedDate}
          </span>
          <span className={style.topMenu__timeText}>
            <span className={style.topMenu__smallGrayText}>
              Time:&nbsp;&nbsp;
            </span>{" "}
            {formattedTime}
          </span>
        </div>
        <div className={style.topMenu__sessionCounter}>
          <span id="sessions-counter" className={style.topMenu__timeText}>
            {sessionsCount}
          </span>
          <span className={style.topMenu__smallGrayText}>Active sessions</span>{" "}
        </div>
      </div>
    </div>
  );
};
