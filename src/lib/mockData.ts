import { UserProfile, WeightLog, DailyCheckin } from '@/types';

export const mockProfile: UserProfile = {
  id: 'usr_demo_77',
  email: 'alex.fitness@example.com',
  fullName: 'Alex Vance',
  heightCm: 178,
  startingWeightKg: 88.5,
  currentWeightKg: 82.3,
  targetWeightKg: 75.0,
  gender: 'male',
  dailyReminderTime: '08:00',
  remindersEnabled: true,
  membershipTier: 'Elite Pro Member',
  createdAt: '2026-09-01T10:00:00Z',
};

export const mockWeightLogs: WeightLog[] = [
  { id: 'log-1', userId: 'usr_demo_77', loggedDate: '2026-10-10', weightKg: 88.5, bmi: 27.9, category: 'Overweight', notes: 'Initial gym registration weigh-in' },
  { id: 'log-2', userId: 'usr_demo_77', loggedDate: '2026-10-15', weightKg: 87.8, bmi: 27.7, category: 'Overweight', notes: 'First week done, high cardio' },
  { id: 'log-3', userId: 'usr_demo_77', loggedDate: '2026-10-20', weightKg: 86.9, bmi: 27.4, category: 'Overweight', notes: 'Diet strictly tracked' },
  { id: 'log-4', userId: 'usr_demo_77', loggedDate: '2026-10-25', weightKg: 85.8, bmi: 27.1, category: 'Overweight', notes: 'Feeling much lighter' },
  { id: 'log-5', userId: 'usr_demo_77', loggedDate: '2026-10-30', weightKg: 84.7, bmi: 26.7, category: 'Overweight', notes: 'Personal best on squats' },
  { id: 'log-6', userId: 'usr_demo_77', loggedDate: '2026-11-04', weightKg: 83.4, bmi: 26.3, category: 'Overweight', notes: 'Morning weigh-in before coffee' },
  { id: 'log-7', userId: 'usr_demo_77', loggedDate: '2026-11-08', weightKg: 82.5, bmi: 26.0, category: 'Overweight', notes: 'Pushed hard in HIIT class' },
  { id: 'log-8', userId: 'usr_demo_77', loggedDate: '2026-11-09', weightKg: 82.3, bmi: 26.0, category: 'Overweight', notes: 'Today check-in' },
];

export const mockDailyCheckins: DailyCheckin[] = [
  { id: 'chk-1', userId: 'usr_demo_77', checkinDate: '2026-11-05', workoutCompleted: true, workoutType: 'Strength', workoutDurationMin: 60, waterLiters: 3.0, energyRating: 4, dietFollowed: true, notes: 'Leg day crushed.' },
  { id: 'chk-2', userId: 'usr_demo_77', checkinDate: '2026-11-06', workoutCompleted: true, workoutType: 'Cardio', workoutDurationMin: 45, waterLiters: 2.5, energyRating: 4, dietFollowed: true, notes: '5k run on treadmill' },
  { id: 'chk-3', userId: 'usr_demo_77', checkinDate: '2026-11-07', workoutCompleted: false, workoutType: 'Rest Day', workoutDurationMin: 0, waterLiters: 2.0, energyRating: 3, dietFollowed: true, notes: 'Active recovery and foam rolling' },
  { id: 'chk-4', userId: 'usr_demo_77', checkinDate: '2026-11-08', workoutCompleted: true, workoutType: 'HIIT', workoutDurationMin: 50, waterLiters: 3.2, energyRating: 5, dietFollowed: true, notes: 'Metcon session' },
  { id: 'chk-5', userId: 'usr_demo_77', checkinDate: '2026-11-09', workoutCompleted: true, workoutType: 'Strength', workoutDurationMin: 65, waterLiters: 2.8, energyRating: 5, dietFollowed: true, notes: 'Chest & Tri pump' },
];
