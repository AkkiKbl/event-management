import pool from "../config/db.js";

export const getAllUserService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE userid=$1`, [id]);
  return result.rows[0];
};

export const createUserByIdService = async (name, email) => {
  const result = await pool.query(
    `INSERT INTO users (name, email) VALUES ($1,$2) RETURNING *`,
    [name, email]
  );
  return result.rows[0];
};

export const updateUserService = async (id, name, email) => {
  const result = pool.query(
    "UPDATE user SET name=$1, email=$2 WHERE userid = $3",
    [name, email, id]
  );
  return result.rows[0];
};

export const deleteUserService = async (id) => {
  const result = pool.query("DELETE FROM users WHERE userid=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};
