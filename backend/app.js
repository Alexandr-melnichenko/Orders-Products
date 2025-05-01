import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.js";
import { config } from "dotenv";
import pool from "./config/db.js";
import runMigrations from "./migrations/1-initial-schema.js";

config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://frontend:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", apiRouter);

// Тестовый эндпоинт для проверки работы
app.get("/api/healthcheck", async (req, res) => {
  try {
    // Проверяем подключение к БД
    await pool.query("SELECT 1");
    res.json({
      status: "OK",
      db: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      db: "disconnected",
      error: error.message,
    });
  }
});

app.get("/api/test", (req, res) => {
  console.log("Запрос получен!"); // Проверка в логах
  res.json({ message: "API работает!", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

console.log("Current DB_HOST:", process.env.DB_HOST);

// Проверка подключения к БД
const checkDB = async () => {
  let retries = 10;
  while (retries > 0) {
    try {
      const conn = await pool.getConnection();
      await conn.ping();
      conn.release();
      console.log("✅ Database connection OK");
      return true;
    } catch (err) {
      retries--;
      console.log(`⚠️ MySQL not ready (${retries} retries left)...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  throw new Error("Failed to connect to MySQL");
};

// Запуск сервера
const startServer = async () => {
  try {
    console.log("🔍 Checking database connection...");
    await checkDB(); // Ждём готовности БД

    console.log("🔄 Running database migrations...");

    if (process.env.NODE_ENV !== "production") {
      await runMigrations().catch((err) => {
        console.error("🚨 Failed to run migrations:", err);
        process.exit(1);
      });
    }

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
};

startServer();
