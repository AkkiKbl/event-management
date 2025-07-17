import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
let pool;
try {
  pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  pool.on("connect", () => {
    console.log("Connection Established");
  });
} catch (err) {
  console.log("ERROR:", err);
}

export default pool;
