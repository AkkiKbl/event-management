import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
    userid SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
) `;
  try {
    pool.query(queryText);
    console.log("User table created(if not exists)");
  } catch (error) {
    console.log("Error creating user Table : ", error);
  }
};

export default createUserTable;
