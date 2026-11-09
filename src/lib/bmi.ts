import { BMIAnalysis, BMICategory } from '@/types';

/**
 * Calculates BMI based on weight in kg and height in cm.
 * Formula: weight (kg) / (height (m) ^ 2)
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  return Math.round(bmi * 10) / 10;
}

/**
 * Determines BMI category per World Health Organization (WHO) standards.
 * < 18.5: Underweight
 * 18.5 - 24.9: Normal weight
 * 25.0 - 29.9: Overweight
 * >= 30.0: Obese
 */
export function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal';
  if (bmi < 30.0) return 'Overweight';
  return 'Obese';
}

/**
 * Calculates healthy weight range (BMI 18.5 to 24.9) for a given height in cm.
 */
export function getHealthyWeightRange(heightCm: number): { minKg: number; maxKg: number } {
  if (heightCm <= 0) return { minKg: 0, maxKg: 0 };
  const heightMeters = heightCm / 100;
  const minKg = 18.5 * (heightMeters * heightMeters);
  const maxKg = 24.9 * (heightMeters * heightMeters);
  return {
    minKg: Math.round(minKg * 10) / 10,
    maxKg: Math.round(maxKg * 10) / 10,
  };
}

/**
 * Comprehensive health & weight analysis with actionable advice.
 */
export function analyzeHealthStatus(weightKg: number, heightCm: number): BMIAnalysis {
  const bmi = calculateBMI(weightKg, heightCm);
  const category = getBMICategory(bmi);
  const { minKg, maxKg } = getHealthyWeightRange(heightCm);

  let weightDifferenceKg = 0;
  let statusMessage = '';
  let recommendedAction = '';
  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let accentColor = '#10B981';

  if (category === 'Underweight') {
    weightDifferenceKg = Math.round((minKg - weightKg) * 10) / 10; // kg to gain
    statusMessage = `You are currently underweight for your height of ${heightCm} cm.`;
    recommendedAction = `You are advised to gain approx. ${weightDifferenceKg} kg of healthy muscle mass to reach the normal BMI threshold (${minKg} kg). Focus on caloric surplus and progressive strength training.`;
    badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    accentColor = '#00F0FF';
  } else if (category === 'Normal') {
    weightDifferenceKg = 0;
    statusMessage = `Your weight is in the ideal, healthy range for your height!`;
    recommendedAction = `Outstanding job! Maintain your current balanced lifestyle with consistent strength training, cardiovascular health, and nutritious meals.`;
    badgeColor = 'bg-neon-lime/10 text-neon-lime border-neon-lime/30';
    accentColor = '#CCFF00';
  } else if (category === 'Overweight') {
    weightDifferenceKg = Math.round((weightKg - maxKg) * 10) / 10; // kg to lose
    statusMessage = `You are currently in the overweight category for your height.`;
    recommendedAction = `You are advised to lose approx. ${weightDifferenceKg} kg to reach your healthy weight boundary of ${maxKg} kg. At a safe pace of 0.5 kg/week, this can be achieved in ~${Math.ceil(weightDifferenceKg / 0.5)} weeks.`;
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    accentColor = '#F59E0B';
  } else {
    // Obese
    weightDifferenceKg = Math.round((weightKg - maxKg) * 10) / 10;
    statusMessage = `You are in the obesity range. Prioritizing fat loss will dramatically improve heart health and mobility.`;
    recommendedAction = `You are advised to lose ${weightDifferenceKg} kg to enter the healthy weight range (${maxKg} kg). A sustained calorie deficit combined with daily cardio & resistance training will give you lasting results.`;
    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    accentColor = '#FF2E63';
  }

  return {
    bmi,
    category,
    healthyWeightMin: minKg,
    healthyWeightMax: maxKg,
    weightDifferenceKg,
    statusMessage,
    recommendedAction,
    badgeColor,
    accentColor,
  };
}
