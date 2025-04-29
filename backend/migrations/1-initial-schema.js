import pool from "../config/db.js";
import fs from "fs/promises";
import path from "path";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const runMigrations = async () => {
  const conn = await pool.getConnection();
  try {
    // 1. Создаем БД
    await conn.query("CREATE DATABASE IF NOT EXISTS test_task_db");
    await conn.query("USE test_task_db");

    // Получаем текущую директорию файла
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // 2. Читаем SQL-файл
    const sqlPath = path.join(__dirname, "../db/database_schema.sql");
    const sql = await fs.readFile(sqlPath, "utf-8");

    // 3. Разбиваем на отдельные запросы (удаляем комментарии и пустые строки)
    const queries = sql
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && !q.startsWith("--"));

    // 4. Выполняем последовательно
    for (const query of queries) {
      await conn.query(`${query};`);
    }

    console.log("✅ Database schema loaded successfully");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    throw err; // Прерываем запуск приложения при ошибке
  } finally {
    conn.release();
  }
};

// Запускаем только если это основной модуль
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export default runMigrations;
