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
    }

    const sql = await fs.readFile(sqlPath, "utf-8");

    console.log(`[MIGRATION DEBUG] Raw SQL length: ${sql.length}`);

    console.log(`Executing full schema SQL...`);
    const [results] = await conn.query(sql); // ОТПРАВЛЯЕМ ВЕСЬ SQL-ФАЙЛ КАК ОДИН ЗАПРОС
    console.log(`Full schema execution result:`, results);

    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    throw err; // Прерываем запуск приложения при ошибке
  } finally {
    conn.release();
  }
};

export default runMigrations;
