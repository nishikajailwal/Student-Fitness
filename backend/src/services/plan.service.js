const pool = require("../config/db");
const aiEngine = require("./ai.engine");
const profileService = require("./profile.service");

async function generatePlan(userId, type) {
  const profile = await profileService.getByUserId(userId);

  if (!profile) throw new Error("Profile required");

  let content;

  if (type === "workout") {
    content = aiEngine.generateWorkoutPlan(profile);
  } else {
    content = aiEngine.generateDietPlan(profile);
  }

  const result = await pool.query(
    `INSERT INTO ai_plans (user_id, plan_type, content)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [userId, type, content]
  );

  return result.rows[0];
}

async function getPlans(userId) {
  const result = await pool.query(
    `SELECT * FROM ai_plans
     WHERE user_id=$1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
}

async function deletePlan(userId, id) {
  await pool.query(
    `DELETE FROM ai_plans
     WHERE id=$1 AND user_id=$2`,
    [id, userId]
  );
}

module.exports = { generatePlan, getPlans, deletePlan };