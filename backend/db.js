import mysql from "mysql2/promise";

const host = process.env.DB_HOST || process.env.MYSQL_HOST || "mysql";
const port = Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306);
const user = process.env.DB_USER || process.env.MYSQL_USER;
const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;
const database = process.env.DB_NAME || process.env.MYSQL_DATABASE;

export const db = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testDbConnection() {
  await db.query("SELECT 1");
}
