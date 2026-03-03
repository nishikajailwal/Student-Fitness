function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return 0;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return Number(bmi.toFixed(1));
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
}

module.exports = { calculateBMI, bmiCategory };