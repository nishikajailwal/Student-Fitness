const pool = require("../config/db");

async function createOrUpdate(userId, data) {
  const existing = await pool.query(
    "SELECT id FROM user_profiles WHERE user_id=$1",
    [userId]
  );

  if (existing.rows.length > 0) {
    const updated = await pool.query(
      `UPDATE user_profiles
       SET age=$1, gender=$2, height_cm=$3, weight_kg=$4,
           goal=$5, budget=$6, diet_preference=$7,
           workout_location=$8, experience_level=$9
       WHERE user_id=$10
       RETURNING *`,
      [
        data.age,
        data.gender,
        data.height_cm,
        data.weight_kg,
        data.goal,
        data.budget,
        data.diet_preference,
        data.workout_location,
        data.experience_level,
        userId
      ]
    );
    return updated.rows[0];
  }

  const created = await pool.query(
    `INSERT INTO user_profiles
     (user_id, age, gender, height_cm, weight_kg, goal,
      budget, diet_preference, workout_location, experience_level)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      userId,
      data.age,
      data.gender,
      data.height_cm,
      data.weight_kg,
      data.goal,
      data.budget,
      data.diet_preference,
      data.workout_location,
      data.experience_level
    ]
  );

  return created.rows[0];
}

async function getByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM user_profiles WHERE user_id=$1",
    [userId]
  );
  return result.rows[0];
}

module.exports = { createOrUpdate, getByUserId };