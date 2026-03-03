function generateWorkoutPlan(profile) {
  if (!profile) return "Complete profile first.";

  if (profile.goal === "Muscle Gain") {
    return "Workout 4x/week: Push-Pull-Legs split + progressive overload.";
  }

  if (profile.goal === "Fat Loss") {
    return "Workout 3x/week strength + 2 cardio sessions.";
  }

  return "Balanced training plan 3-4x per week.";
}

function generateDietPlan(profile) {
  if (!profile) return "Complete profile first.";

  if (profile.goal === "Muscle Gain") {
    return "Calorie surplus + 2g protein per kg bodyweight.";
  }

  if (profile.goal === "Fat Loss") {
    return "Calorie deficit of 300-400 kcal.";
  }

  return "Maintain balanced macronutrients.";
}

function generateChatResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("protein"))
    return "You need approx 1.6-2.2g protein per kg bodyweight.";

  if (msg.includes("weight gain"))
    return "Increase calories gradually by 300-400 kcal.";

  if (msg.includes("fat loss"))
    return "Maintain calorie deficit and strength train.";

  return "Stay consistent and track your progress weekly.";
}

/* Future Ready Hooks */
function mlModelPredict() {
  return null;
}

function llmGenerate() {
  return null;
}

module.exports = {
  generateWorkoutPlan,
  generateDietPlan,
  generateChatResponse,
  mlModelPredict,
  llmGenerate
};