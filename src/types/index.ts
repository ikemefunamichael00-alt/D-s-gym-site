export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export interface BMIAnalysis {
  bmi: number;
  category: BMICategory;
  healthyWeightMin: number;
  healthyWeightMax: number;
  weightDifferenceKg: number; // positive if needs to lose, negative if needs to gain, 0 if normal
  statusMessage: string;
  recommendedAction: string;
  badgeColor: string;
  accentColor: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  heightCm: number;
  targetWeightKg: number;
  currentWeightKg: number;
  startingWeightKg: number;
  gender: 'male' | 'female' | 'other' | 'unspecified';
  dailyReminderTime: string;
  remindersEnabled: boolean;
  membershipTier: string;
  createdAt: string;
}

export interface WeightLog {
  id: string;
  userId: string;
  weightKg: number;
  bmi: number;
  category: BMICategory;
  notes?: string;
  loggedDate: string; // YYYY-MM-DD
  createdAt?: string;
}

export interface DailyCheckin {
  id: string;
  userId: string;
  checkinDate: string; // YYYY-MM-DD
  workoutCompleted: boolean;
  workoutType?: string; // 'Strength' | 'Cardio' | 'HIIT' | 'Yoga' | 'Rest Day'
  workoutDurationMin?: number;
  waterLiters: number;
  energyRating: number; // 1 - 5
  dietFollowed: boolean;
  notes?: string;
}

export interface GoalProgress {
  startingWeight: number;
  currentWeight: number;
  targetWeight: number;
  totalToLose: number;
  totalLost: number;
  percentCompleted: number;
  kgRemaining: number;
  estimatedWeeksRemaining: number;
}
