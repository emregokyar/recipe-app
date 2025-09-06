import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER || "postgres";
const DB_PASS = process.env.DB_PASS || "password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_NAME = process.env.DB_NAME || "recipe";

const db = new pg.Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

async function connectDB() {
  try {
    await db.connect();
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
}

export { connectDB, db };