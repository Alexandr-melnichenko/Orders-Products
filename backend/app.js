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
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
app.get("/api/test", (req, res) => {
  console.log("Запрос получен!"); // Проверка в логах
  res.send("API работает!");
});

const PORT = process.env.PORT || 6000;

console.log("Current DB_HOST:", process.env.DB_HOST);

// Проверка подключения к БД
const checkDB = async () => {
  let retries = 10;
  while (retries > 0) {
    try {
      const conn = await pool.getConnection();
      conn.release();
      console.log("✅ MySQL is ready");
      return true;
    } catch (err) {
      retries--;
      console.log(`⚠️ MySQL not ready (${retries} retries left)...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  throw new Error("Failed to connect to MySQL");
};

// const startServer = async () => {
//   let connected = false;
//   let retries = 5;
//   while (!connected && retries > 0) {
//     try {
//       await pool.getConnection();
//       console.log("✅ Connected to MySQL");
//       connected = true;
//     } catch (err) {
//       retries--;
//       console.log(`❌ Connection failed, ${retries} retries left...`);
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }
//   }
//   if (!connected) throw new Error("Failed to connect to MySQL");
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// };

// startServer().catch(console.error);

// Запуск сервера
const startServer = async () => {
  await checkDB(); // Ждём готовности БД
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
