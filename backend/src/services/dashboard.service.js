const pool = require("../config/db");
const { calculateBMI, bmiCategory } = require("../utils/bmi");

async function getDashboard(userId) {
  const profileRes = await pool.query(
    "SELECT * FROM user_profiles WHERE user_id=$1",
    [userId]
  );

  const profile = profileRes.rows[0];
  if (!profile) throw new Error("Profile not found");

  const weightRes = await pool.query(
    `SELECT weight_kg FROM weight_logs
     WHERE user_id=$1
     ORDER BY logged_at DESC`,
    [userId]
  );

  const weights = weightRes.rows;

  const latestWeight = weights[0]?.weight_kg || profile.weight_kg;
  const previousWeight = weights[1]?.weight_kg || latestWeight;
  const weightChange = latestWeight - previousWeight;

  const bmi = calculateBMI(latestWeight, profile.height_cm);

  const recommendedCalories =
    profile.goal === "Muscle Gain" ? 2800 : 2200;

  const recommendedProtein = latestWeight * 2;

  const goalProgress = Math.max(
    0,
    Math.min(100, (latestWeight / profile.weight_kg) * 100)
  );

  return {
    bmi,
    bmiCategory: bmiCategory(bmi),
    latestWeight,
    weightChange,
    recommendedCalories,
    recommendedProtein,
    goalProgress
  };
}

module.exports = { getDashboard };