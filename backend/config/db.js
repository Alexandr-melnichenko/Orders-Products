import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

console.log("Current DB_HOST:", process.env.DB_HOST);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test_task_db",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4",
  multipleStatements: true,
});

(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT DATABASE() AS current_db");
    console.log(`Successfully connected to database: ${rows[0].current_db}`);
  } catch (err) {
    console.error("Failed to acquire initial DB connection or check DB:", err);
  } finally {
    if (connection) connection.release();
  }
})();

export default pool;
