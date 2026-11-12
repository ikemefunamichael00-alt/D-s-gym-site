'use client';

import React, { useState } from 'react';
import { 
  Scale, 
  TrendingDown, 
  Flame, 
  Target, 
  Calendar, 
  Plus, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  Zap, 
  Dumbbell, 
  Activity,
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { UserProfile, WeightLog, DailyCheckin } from '@/types';
import { analyzeHealthStatus } from '@/lib/bmi';

interface DashboardViewProps {
  profile: UserProfile;
  weightLogs: WeightLog[];
  checkins: DailyCheckin[];
  onAddWeightLog: (weightKg: number, notes?: string) => void;
  onAddCheckin: (checkin: Omit<DailyCheckin, 'id' | 'userId'>) => void;
  onUpdateReminder: (time: string, enabled: boolean) => void;
  onEditProfileMetrics: (height: number, target: number) => void;
}

export default function DashboardView({
  profile,
  weightLogs,
  checkins,
  onAddWeightLog,
  onAddCheckin,
  onUpdateReminder,
}: DashboardViewProps) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const [inputWeight, setInputWeight] = useState<number>(profile.currentWeightKg || 80);
  const [inputNotes, setInputNotes] = useState<string>('');

  const [checkinWorkout, setCheckinWorkout] = useState<boolean>(true);
  const [checkinWorkoutType, setCheckinWorkoutType] = useState<string>('Strength');
  const [checkinDuration, setCheckinDuration] = useState<number>(45);
  const [checkinWater, setCheckinWater] = useState<number>(2.5);
  const [checkinEnergy, setCheckinEnergy] = useState<number>(4);
  const [checkinNotes, setCheckinNotes] = useState<string>('');

  const [reminderTime, setReminderTime] = useState<string>(profile.dailyReminderTime || '08:00');
  const [remindersOn, setRemindersOn] = useState<boolean>(profile.remindersEnabled ?? true);

  const healthAnalysis = analyzeHealthStatus(profile.currentWeightKg, profile.heightCm);

  const totalToLose = Math.max(profile.startingWeightKg - profile.targetWeightKg, 0.1);
  const totalLost = Math.round((profile.startingWeightKg - profile.currentWeightKg) * 10) / 10;
  const progressPercent = Math.min(Math.max(Math.round((totalLost / totalToLose) * 100), 0), 100);
  const kgRemaining = Math.max(Math.round((profile.currentWeightKg - profile.targetWeightKg) * 10) / 10, 0);
  const estimatedWeeks = Math.ceil(kgRemaining / 0.5);

  const streakDays = checkins.length;

  // Accessibility: scroll lock and Escape key handling for modals
  React.useEffect(() => {
    if (showLogModal || showCheckinModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowLogModal(false);
          setShowCheckinModal(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showLogModal, showCheckinModal]);

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWeightLog(inputWeight, inputNotes);
    setShowLogModal(false);
    setInputNotes('');
    triggerToast(`Logged ${inputWeight} kg successfully!`);
  };

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    onAddCheckin({
      checkinDate: today,
      workoutCompleted: checkinWorkout,
      workoutType: checkinWorkoutType,
      workoutDurationMin: checkinDuration,
      waterLiters: checkinWater,
      energyRating: checkinEnergy,
      dietFollowed: true,
      notes: checkinNotes,
    });
    setShowCheckinModal(false);
    triggerToast('Daily check-in saved! Keep up the habit streak! 🔥');
  };

  const handleSaveReminderSettings = () => {
    onUpdateReminder(reminderTime, remindersOn);
    triggerToast(`Daily reminder saved for ${reminderTime}`);
  };

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const testDailyReminderPrompt = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification("anygym Daily Weigh-In", {
          body: `Good morning ${profile.fullName}! Time for your weigh-in. Target: ${profile.targetWeightKg} kg.`,
          icon: '/favicon.ico',
        });
      } else {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            new Notification("anygym Daily Weigh-In", {
              body: `Good morning ${profile.fullName}! Time for your morning weigh-in.`,
            });
          }
        });
      }
    }
    triggerToast(`🔔 Test notification sent: "Time for your morning weigh-in at ${reminderTime}!"`);
  };

  // Find max and min weight for visual chart bounds
  const weights = weightLogs.map((l) => l.weightKg);
  const baseMin = weights.length > 0 
    ? Math.min(...weights, profile.targetWeightKg) 
    : Math.min(profile.currentWeightKg || 80, profile.targetWeightKg || 70);
  const baseMax = weights.length > 0 
    ? Math.max(...weights, profile.startingWeightKg) 
    : Math.max(profile.currentWeightKg || 80, profile.startingWeightKg || 80);
  const minChart = baseMin - 2;
  const maxChart = Math.max(baseMax + 2, minChart + 6);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Toast popup */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-coral text-white font-bold px-5 py-3 rounded-token-xs shadow-coral flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-5 h-5 fill-white" />
          <span className="text-token-xs">{notificationToast}</span>
        </div>
      )}

      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-coral text-token-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Member Command Center</span>
          </div>
          <h1 className="text-token-xl sm:text-token-2xl font-black text-white uppercase tracking-tight">
            Athlete: <span className="text-brand-coral">{profile.fullName}</span>
          </h1>
          <p className="text-token-xs text-zinc-400 mt-1">
            Height: <strong className="text-white">{profile.heightCm} cm</strong> • Starting: <strong className="text-white">{profile.startingWeightKg} kg</strong> • Goal: <strong className="text-brand-coral">{profile.targetWeightKg} kg</strong>
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCheckinModal(true)}
            className="px-4 py-2.5 rounded-token-xs font-bold text-token-xs uppercase tracking-wider bg-surface-card border border-surface-border text-white hover:bg-surface-hover flex items-center gap-2 transition-all duration-instant"
          >
            <Calendar className="w-4 h-4 text-brand-coral" />
            <span>Daily Check-In</span>
          </button>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-5 py-2.5 rounded-token-xs font-black text-token-xs uppercase tracking-wider bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral flex items-center gap-2 transition-all duration-instant"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Log Weight (kg)</span>
          </button>
        </div>
      </div>

      {/* Health Status & Kilogram Advisory Banner */}
      <div className="bg-surface-card border-2 border-surface-border rounded-token-xs p-6 sm:p-8 relative overflow-hidden shadow-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-token-xs font-black uppercase tracking-wider text-zinc-400">
                Current WHO Biometric Evaluation
              </span>
              <div className={`px-3 py-1 rounded-token-sm border text-[11px] font-black uppercase ${
                healthAnalysis.category === 'Normal'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-brand-coral/15 text-brand-coral border-brand-coral/30'
              }`}>
                BMI {healthAnalysis.bmi} • {healthAnalysis.category}
              </div>
            </div>

            <h2 className="text-token-xl sm:text-token-2xl font-black text-white leading-tight">
              {healthAnalysis.category === 'Normal' ? (
                <span className="text-emerald-400">
                  Healthy Weight Achieved. Continue Universal Training.
                </span>
              ) : healthAnalysis.category === 'Overweight' || healthAnalysis.category === 'Obese' ? (
                <span>
                  You are advised to lose <span className="text-brand-coral">{healthAnalysis.weightDifferenceKg} kg</span> to enter the normal WHO weight range ({healthAnalysis.healthyWeightMax} kg).
                </span>
              ) : (
                <span>
                  You are advised to gain <span className="text-accent-cyan">{healthAnalysis.weightDifferenceKg} kg</span> of healthy mass to reach normal BMI ({healthAnalysis.healthyWeightMin} kg).
                </span>
              )}
            </h2>

            <p className="text-zinc-300 text-token-xs leading-relaxed max-w-3xl">
              {healthAnalysis.recommendedAction}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-token-xs text-zinc-400">
              <div>
                Target range for your {profile.heightCm} cm frame:{' '}
                <strong className="text-white font-bold">{healthAnalysis.healthyWeightMin} kg – {healthAnalysis.healthyWeightMax} kg</strong>
              </div>
              {kgRemaining > 0 && (
                <div>
                  Pace to goal {profile.targetWeightKg} kg:{' '}
                  <strong className="text-brand-coral font-bold">~{estimatedWeeks} weeks remaining</strong> (at 0.5 kg/week)
                </div>
              )}
            </div>
          </div>

          {/* Habit Streak Widget */}
          <div className="bg-surface-subtle p-5 rounded-token-xs border border-surface-border flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-token-xs bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange">
              <Flame className="w-6 h-6 fill-accent-orange animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Check-In Streak</span>
              <span className="text-token-xl font-black text-white">{streakDays} Days</span>
              <span className="text-[11px] text-emerald-400 font-semibold block">Habits Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Current Weight */}
        <div className="bg-surface-card border border-surface-border p-6 rounded-token-xs hover:border-zinc-600 transition-all duration-instant">
          <div className="flex items-center justify-between text-zinc-400 text-token-xs font-bold uppercase mb-2">
            <span>Current Weight</span>
            <Scale className="w-4 h-4 text-brand-coral" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-token-2xl font-black text-white">{profile.currentWeightKg}</span>
            <span className="text-token-xs font-bold text-zinc-400">kg</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-token-xs text-zinc-400">
            <span>Baseline:</span>
            <strong className="text-zinc-200">{profile.startingWeightKg} kg</strong>
          </div>
        </div>

        {/* Total Weight Shed */}
        <div className="bg-surface-card border border-surface-border p-6 rounded-token-xs hover:border-zinc-600 transition-all duration-instant">
          <div className="flex items-center justify-between text-zinc-400 text-token-xs font-bold uppercase mb-2">
            <span>Total Shed</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-token-2xl font-black text-emerald-400">
              {totalLost > 0 ? `-${totalLost}` : '0.0'}
            </span>
            <span className="text-token-xs font-bold text-zinc-400">kg</span>
          </div>
          <div className="mt-3 text-token-xs text-emerald-400 font-medium">
            {totalLost > 0 ? `Shed ${totalLost} kg since enrollment` : 'Record your first weigh-in'}
          </div>
        </div>

        {/* Goal Remaining */}
        <div className="bg-surface-card border border-surface-border p-6 rounded-token-xs hover:border-zinc-600 transition-all duration-instant">
          <div className="flex items-center justify-between text-zinc-400 text-token-xs font-bold uppercase mb-2">
            <span>Distance To Goal</span>
            <Target className="w-4 h-4 text-accent-cyan" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-token-2xl font-black text-white">{kgRemaining}</span>
            <span className="text-token-xs font-bold text-zinc-400">kg to go</span>
          </div>
          <div className="mt-3 text-token-xs text-zinc-400">
            Target: <strong className="text-brand-coral">{profile.targetWeightKg} kg</strong>
          </div>
        </div>

        {/* Progress % */}
        <div className="bg-surface-card border border-surface-border p-6 rounded-token-xs hover:border-zinc-600 transition-all duration-instant">
          <div className="flex items-center justify-between text-zinc-400 text-token-xs font-bold uppercase mb-2">
            <span>Goal Accomplished</span>
            <Award className="w-4 h-4 text-brand-coral" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-token-2xl font-black text-brand-coral">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-subtle h-2 rounded-token-sm mt-3 overflow-hidden border border-surface-border">
            <div 
              className="bg-brand-coral h-full rounded-token-sm transition-all duration-fast shadow-coral"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Weight Progress Chart & Timeline */}
      <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-token-md font-black text-white uppercase tracking-tight flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-brand-coral" />
              <span>Weight Progression Curve</span>
            </h3>
            <p className="text-token-xs text-zinc-400 mt-0.5">
              Historical weigh-ins plotted against your {profile.targetWeightKg} kg target goal line.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-token-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-coral" />
              <span className="text-zinc-300">Actual Weight</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-400" />
              <span className="text-zinc-400">Goal ({profile.targetWeightKg} kg)</span>
            </div>
          </div>
        </div>

        {/* Custom Visual SVG Chart or Empty State */}
        {weightLogs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-surface-subtle/40 rounded-token-xs border border-dashed border-surface-border">
            <div className="w-12 h-12 rounded-token-xs bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral mb-3">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h4 className="text-token-sm font-bold text-white uppercase">No Weigh-Ins Recorded Yet</h4>
            <p className="text-token-xs text-zinc-400 max-w-sm mt-1 mb-4">
              Log your initial weigh-in today to calculate your baseline BMI and start plotting your weight progression graph!
            </p>
            <button
              onClick={() => setShowLogModal(true)}
              className="px-5 py-2.5 rounded-token-xs text-token-xs font-black uppercase bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral"
            >
              + Record Initial Weigh-In
            </button>
          </div>
        ) : (
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="coralGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Target line */}
              {(() => {
                const yTarget = 200 - ((profile.targetWeightKg - minChart) / (maxChart - minChart)) * 180;
                return (
                  <line
                    x1="0"
                    y1={yTarget}
                    x2="600"
                    y2={yTarget}
                    stroke="#20c997"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.7"
                  />
                );
              })()}

              {/* Points and Area */}
              {(() => {
                if (weightLogs.length === 1) {
                  const log = weightLogs[0];
                  const y = 200 - ((log.weightKg - minChart) / (maxChart - minChart)) * 180;
                  return (
                    <g>
                      <circle cx="300" cy={y} r={7} fill="#0c0e12" stroke="#ff6b6b" strokeWidth="4" />
                      <text x="300" y={y - 14} textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="bold">
                        {log.weightKg} kg (Starting Point)
                      </text>
                    </g>
                  );
                }

                const points = weightLogs.map((log, idx) => {
                  const x = (idx / (weightLogs.length - 1)) * 580 + 10;
                  const y = 200 - ((log.weightKg - minChart) / (maxChart - minChart)) * 180;
                  return { x, y, weight: log.weightKg, date: log.loggedDate };
                });

                const pathD = points.reduce((acc, curr, idx) => {
                  return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                }, '');

                const areaD = `${pathD} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`;

                return (
                  <g>
                    <path d={areaD} fill="url(#coralGradient)" />
                    <path d={pathD} fill="none" stroke="#ff6b6b" strokeWidth="3" />
                    {points.map((p, pIdx) => (
                      <g key={pIdx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={5}
                          fill="#0c0e12"
                          stroke="#ff6b6b"
                          strokeWidth="3"
                          className="transition-all hover:scale-125"
                        />
                        <text
                          x={p.x}
                          y={p.y - 10}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {p.weight} kg
                        </text>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          </div>
        )}

        {/* Date labels */}
        {weightLogs.length > 0 && (
          <div className="flex justify-between text-[11px] text-zinc-500 font-semibold pt-4 border-t border-surface-border mt-4">
            {weightLogs.map((log, i) => (
              <span key={i}>{log.loggedDate.slice(5)}</span>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Daily Reminder Settings + Daily Habits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Daily Reminder Setup */}
        <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-token-xs bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-token-md font-bold text-white uppercase">Daily Weigh-In Reminder</h4>
                <p className="text-token-xs text-zinc-400">Habit notifications to keep you on schedule</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={remindersOn}
                onChange={(e) => setRemindersOn(e.target.checked)}
                className="sr-only peer"
                aria-label="Toggle daily reminder"
              />
              <div className="w-11 h-6 bg-surface-subtle peer-focus:outline-none rounded-token-sm peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-coral"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="reminder-time-input" className="block text-token-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Preferred Reminder Time
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="reminder-time-input"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveReminderSettings}
                  className="px-4 py-2.5 bg-brand-coral text-white font-bold text-token-xs uppercase rounded-token-xs hover:bg-brand-coralHover shadow-coral transition-colors duration-instant"
                >
                  Save Time
                </button>
              </div>
            </div>

            <div className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border text-token-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <span>Morning Routine Recommendation</span>
              </div>
              <p className="text-zinc-400">
                For optimal tracking consistency, step on the scale each morning after waking up and before breakfast.
              </p>
              <button
                type="button"
                onClick={testDailyReminderPrompt}
                className="pt-1 text-token-xs text-brand-coral font-bold hover:underline flex items-center gap-1.5"
              >
                <span>Send Test Notification Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Habits & Check-in Status */}
        <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-token-xs bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-token-md font-bold text-white uppercase">Today&apos;s Daily Check-In</h4>
                <p className="text-token-xs text-zinc-400">Workout, hydration, and nutrition habits</p>
              </div>
            </div>
            <button
              onClick={() => setShowCheckinModal(true)}
              className="text-token-xs font-bold text-brand-coral hover:underline"
            >
              + Check In
            </button>
          </div>

          <div className="space-y-3">
            {checkins.length === 0 ? (
              <div className="p-6 rounded-token-xs bg-surface-subtle/50 border border-dashed border-surface-border text-center space-y-2">
                <span className="text-token-xs text-zinc-400 block">No daily check-ins recorded yet.</span>
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(true)}
                  className="text-token-xs text-brand-coral font-bold hover:underline"
                >
                  + Record First Check-In
                </button>
              </div>
            ) : (
              checkins.slice(-3).reverse().map((chk) => (
                <div
                  key={chk.id}
                  className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-token-xs font-bold text-white">{chk.checkinDate}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-token-sm bg-surface-card border border-surface-border text-brand-coral">
                        {chk.workoutCompleted ? chk.workoutType : 'Rest Day'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-token-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-sky-400" />
                        {chk.waterLiters}L Water
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-accent-orange" />
                        Energy: {chk.energyRating}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Weigh-in History Table */}
      <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between pb-6 border-b border-surface-border">
          <div>
            <h3 className="text-token-md font-bold text-white uppercase">Weigh-In History Log</h3>
            <p className="text-token-xs text-zinc-400">Chronological records with automatic WHO BMI classification</p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2 bg-surface-subtle hover:bg-surface-hover border border-surface-border rounded-token-xs text-token-xs font-bold text-white transition-colors duration-instant"
          >
            + New Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm mt-4">
            <thead>
              <tr className="border-b border-surface-border text-token-xs uppercase font-bold text-zinc-400">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Weight (kg)</th>
                <th className="py-3 px-4">BMI</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border text-zinc-200">
              {weightLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-token-xs text-zinc-400">
                    No weigh-in records found. Click &quot;+ New Entry&quot; to save your first measurement.
                  </td>
                </tr>
              ) : (
                weightLogs.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-surface-subtle/50 transition-colors duration-instant">
                    <td className="py-3.5 px-4 font-medium text-white">{log.loggedDate}</td>
                    <td className="py-3.5 px-4 font-bold text-brand-coral">{log.weightKg} kg</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-300">{log.bmi}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-token-sm bg-surface-subtle border border-surface-border text-zinc-300">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-token-xs text-zinc-400 max-w-xs truncate">
                      {log.notes || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Log Weight Modal */}
      {showLogModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogModal(false);
          }}
        >
          <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="weigh-in-modal-title"
            className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto shadow-card"
          >
            <h3 id="weigh-in-modal-title" className="text-token-md font-black text-white uppercase mb-2">Record Weigh-In</h3>
            <p className="text-token-xs text-zinc-400 mb-6">Enter today&apos;s weight in kilograms.</p>

            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div>
                <label htmlFor="log-weight-input" className="block text-token-xs font-bold uppercase text-zinc-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  id="log-weight-input"
                  type="number"
                  step={0.1}
                  required
                  value={inputWeight}
                  onChange={(e) => setInputWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-md font-bold focus:outline-none focus:border-brand-coral"
                />
              </div>

              <div>
                <label htmlFor="log-notes-input" className="block text-token-xs font-bold uppercase text-zinc-300 mb-2">
                  Daily Notes (Optional)
                </label>
                <textarea
                  id="log-notes-input"
                  rows={2}
                  placeholder="e.g. Morning fasted, post hydration"
                  value={inputNotes}
                  onChange={(e) => setInputNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-3 rounded-token-xs font-bold text-token-xs bg-surface-subtle text-zinc-300 hover:bg-surface-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-token-xs font-black uppercase text-token-xs bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Daily Check-in Modal */}
      {showCheckinModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCheckinModal(false);
          }}
        >
          <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="checkin-modal-title"
            className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto shadow-card"
          >
            <h3 id="checkin-modal-title" className="text-token-md font-black text-white uppercase mb-2">Daily Check-In</h3>
            <p className="text-token-xs text-zinc-400 mb-6">Track your daily universal workouts and hydration.</p>

            <form onSubmit={handleCheckinSubmit} className="space-y-4">
              
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-surface-subtle rounded-token-xs border border-surface-border">
                  <input
                    type="checkbox"
                    checked={checkinWorkout}
                    onChange={(e) => setCheckinWorkout(e.target.checked)}
                    className="w-5 h-5 accent-brand-coral rounded"
                  />
                  <span className="text-token-xs font-bold text-white uppercase">Did you work out today?</span>
                </label>
              </div>

              {checkinWorkout && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="chk-type" className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Type</label>
                    <select
                      id="chk-type"
                      value={checkinWorkoutType}
                      onChange={(e) => setCheckinWorkoutType(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral"
                    >
                      <option value="Strength">Strength / Weights</option>
                      <option value="Cardio">Cardio / Treadmill</option>
                      <option value="HIIT">HIIT / Functional</option>
                      <option value="Yoga">Yoga / Mobility</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="chk-duration" className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Mins</label>
                    <input
                      id="chk-duration"
                      type="number"
                      value={checkinDuration}
                      onChange={(e) => setCheckinDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="chk-water" className="block text-token-xs font-bold uppercase text-zinc-300 mb-1">
                  Water: {checkinWater} Liters
                </label>
                <input
                  id="chk-water"
                  type="range"
                  min={0.5}
                  max={6.0}
                  step={0.5}
                  value={checkinWater}
                  onChange={(e) => setCheckinWater(Number(e.target.value))}
                  className="w-full h-2 bg-surface-border rounded-token-xs appearance-none cursor-pointer accent-brand-coral"
                />
              </div>

              <div>
                <label className="block text-token-xs font-bold uppercase text-zinc-300 mb-1">
                  Energy Rating (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setCheckinEnergy(lvl)}
                      className={`flex-1 py-2 rounded-token-xs font-bold text-token-xs ${
                        checkinEnergy === lvl
                          ? 'bg-brand-coral text-white'
                          : 'bg-surface-subtle text-zinc-400 border border-surface-border'
                      }`}
                    >
                      {lvl}★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="chk-reflection" className="block text-token-xs font-bold uppercase text-zinc-300 mb-1">Daily Reflection</label>
                <input
                  id="chk-reflection"
                  type="text"
                  placeholder="How did training feel?"
                  value={checkinNotes}
                  onChange={(e) => setCheckinNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="flex-1 py-3 rounded-token-xs font-bold text-token-xs bg-surface-subtle text-zinc-300 hover:bg-surface-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-token-xs font-black uppercase text-token-xs bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral"
                >
                  Save Check-In
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
