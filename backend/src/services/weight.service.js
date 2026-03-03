const pool = require("../config/db");

async function addWeight(userId, weight) {
  const result = await pool.query(
    `INSERT INTO weight_logs (user_id, weight_kg)
     VALUES ($1,$2)
     RETURNING *`,
    [userId, weight]
  );
  return result.rows[0];
}

async function getHistory(userId) {
  const result = await pool.query(
    `SELECT id, weight_kg, logged_at
     FROM weight_logs
     WHERE user_id=$1
     ORDER BY logged_at DESC`,
    [userId]
  );
  return result.rows;
}

async function deleteWeight(userId, id) {
  await pool.query(
    `DELETE FROM weight_logs
     WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
}

module.exports = { addWeight, getHistory, deleteWeight };