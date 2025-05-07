import pool from "../config/db.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Получаем текущую директорию файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  const conn = await pool.getConnection();
  try {
    // 1. Проверяем: есть ли уже таблицы
    const [tables] = await conn.query("SHOW TABLES LIKE 'orders'");
    if (tables.length > 0) {
      console.log("ℹ️ Tables already exist — skipping migrations");
      return;
    }

    console.log("🔄 No existing tables found — running migrations...");

    // 2. Читаем SQL-файл
    const sqlPath = path.join(__dirname, "../db/database_schema.sql");

    try {
      await fs.access(sqlPath); // Проверяем доступ к файлу
    } catch {
      throw new Error(`Migration file not found: ${sqlPath}`);
      return;
    }

    const sql = await fs.readFile(sqlPath, "utf-8");

    // 3. Разбиваем на отдельные запросы (удаляем комментарии и пустые строки)
    const queries = sql
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0 && !q.startsWith("--"));

    // 4. Выполняем последовательно
    await conn.query("USE test_task_db");

    for (const query of queries) {
      try {
        await conn.query(query);
      } catch (error) {
        // Игнорируем ошибки типа "таблица уже существует"
        if (!error.message.includes("already exists")) {
          console.error(`Migration error in query: ${query}`);
          throw error;
        }
      }
    }

    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Migration failed:", error.message);
    throw err; // Прерываем запуск приложения при ошибке
  } finally {
    conn.release();
  }
};

export default runMigrations;
