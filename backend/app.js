import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.js";
import { config } from "dotenv";
import pool from "./config/db.js";
import runMigrations from "./migrations/1-initial-schema.js";
import path from "path"; // Добавьте этот импорт
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

config();

// Получаем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Указываем правильный путь к uploads
const uploadsPath = path.join(__dirname, "uploads");

// Проверяем и создаем папку при необходимости
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://frontend:5173", // Для Docker-сети
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Добавьте методы
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Явное указание заголовков
  },
  path: "/socket.io",
});

io.on("connection", (socket) => {
  console.log(`✅ Новое подключение: ${socket.id}`);
  console.log(`🌐 Origin: ${socket.handshake.headers.origin}`);

  io.emit("sessions-update", { count: io.engine.clientsCount });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    io.emit("sessions-update", { count: io.engine.clientsCount });
  });
});

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

app.use("/uploads", express.static(uploadsPath));
console.log(`Статические файлы обслуживаются из: ${uploadsPath}`);

// Пример роута для теста
app.get("/test", (req, res) => {
  res.sendFile(path.join(uploadsPath, "products/test.jpg"));
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

    // Создаем папку uploads если не существует
    // if (!fs.existsSync(uploadsPath)) {
    //   fs.mkdirSync(uploadsPath, { recursive: true });
    //   console.log("Created uploads directory");
    // }

    // app.listen(process.env.PORT || 3000, () => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server started on port ${process.env.PORT || 3000}`);
      console.log(
        `Socket.io available at ws://localhost:${
          process.env.PORT || 3000
        }/socket.io`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
};

startServer();
