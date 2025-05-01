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
});

export default pool;
