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
  AlertCircle
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
  onEditProfileMetrics,
}: DashboardViewProps) {
  // Modal states
  const [showLogModal, setShowLogModal] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Form inputs for new weigh-in
  const [inputWeight, setInputWeight] = useState<number>(profile.currentWeightKg);
  const [inputNotes, setInputNotes] = useState<string>('');

  // Form inputs for daily check-in
  const [checkinWorkout, setCheckinWorkout] = useState<boolean>(true);
  const [checkinWorkoutType, setCheckinWorkoutType] = useState<string>('Strength');
  const [checkinDuration, setCheckinDuration] = useState<number>(45);
  const [checkinWater, setCheckinWater] = useState<number>(2.5);
  const [checkinEnergy, setCheckinEnergy] = useState<number>(4);
  const [checkinNotes, setCheckinNotes] = useState<string>('');

  // Reminder settings state
  const [reminderTime, setReminderTime] = useState<string>(profile.dailyReminderTime || '08:00');
  const [remindersOn, setRemindersOn] = useState<boolean>(profile.remindersEnabled ?? true);

  // Health and BMI calculations
  const healthAnalysis = analyzeHealthStatus(profile.currentWeightKg, profile.heightCm);

  // Progress metrics
  const totalToLose = Math.max(profile.startingWeightKg - profile.targetWeightKg, 0.1);
  const totalLost = Math.round((profile.startingWeightKg - profile.currentWeightKg) * 10) / 10;
  const progressPercent = Math.min(Math.max(Math.round((totalLost / totalToLose) * 100), 0), 100);
  const kgRemaining = Math.max(Math.round((profile.currentWeightKg - profile.targetWeightKg) * 10) / 10, 0);
  const estimatedWeeks = Math.ceil(kgRemaining / 0.5); // at healthy 0.5kg/week

  // Calculate streak from checkins
  const streakDays = checkins.length;

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
    triggerToast('Daily check-in saved! Keep up the streak! 🔥');
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
        new Notification("D's Gym Daily Reminder", {
          body: `Good morning ${profile.fullName}! Time for your morning weigh-in and daily check-in. Current Goal: ${profile.targetWeightKg} kg.`,
          icon: '/favicon.ico',
        });
      } else {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            new Notification("D's Gym Daily Reminder", {
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
        <div className="fixed bottom-6 right-6 z-50 bg-neon-lime text-background font-bold px-5 py-3 rounded-2xl shadow-neon flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-5 h-5 fill-background" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 text-neon-lime text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Member Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Athlete: <span className="text-neon-lime">{profile.fullName}</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Height: <strong className="text-white">{profile.heightCm} cm</strong> • Starting: <strong className="text-white">{profile.startingWeightKg} kg</strong> • Goal: <strong className="text-neon-lime">{profile.targetWeightKg} kg</strong>
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCheckinModal(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-surface-subtle border border-surface-border text-white hover:bg-surface-hover flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-neon-lime" />
            <span>Daily Check-In</span>
          </button>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Log Weight (kg)</span>
          </button>
        </div>
      </div>

      {/* KEY REQUIREMENT: Health Status & Kilogram Advisory Banner */}
      <div className="bg-surface border-2 border-surface-border rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
                Current Health &amp; Weight Analysis
              </span>
              <div className={`px-3 py-1 rounded-xl border text-xs font-bold uppercase ${healthAnalysis.badgeColor}`}>
                BMI {healthAnalysis.bmi} • {healthAnalysis.category}
              </div>
            </div>

            {/* Exact kilograms to lose advice */}
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {healthAnalysis.category === 'Normal' ? (
                <span className="text-emerald-400">
                  You are at a Healthy Weight! Maintain with strength workouts.
                </span>
              ) : healthAnalysis.category === 'Overweight' || healthAnalysis.category === 'Obese' ? (
                <span>
                  You are advised to lose <span className="text-neon-lime">{healthAnalysis.weightDifferenceKg} kg</span> to reach the healthy BMI boundary ({healthAnalysis.healthyWeightMax} kg).
                </span>
              ) : (
                <span>
                  You are advised to gain <span className="text-accent-cyan">{healthAnalysis.weightDifferenceKg} kg</span> to reach the normal BMI threshold ({healthAnalysis.healthyWeightMin} kg).
                </span>
              )}
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
              {healthAnalysis.recommendedAction}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div>
                Ideal range for your {profile.heightCm} cm height:{' '}
                <strong className="text-white font-bold">{healthAnalysis.healthyWeightMin} kg – {healthAnalysis.healthyWeightMax} kg</strong>
              </div>
              {kgRemaining > 0 && (
                <div>
                  Pace to your target {profile.targetWeightKg} kg:{' '}
                  <strong className="text-neon-lime font-bold">~{estimatedWeeks} weeks remaining</strong> (at 0.5 kg/week)
                </div>
              )}
            </div>
          </div>

          {/* Quick Streak Widget */}
          <div className="bg-surface-subtle p-5 rounded-2xl border border-surface-border flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange">
              <Flame className="w-7 h-7 fill-accent-orange animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-zinc-400 block">Check-In Streak</span>
              <span className="text-2xl font-black text-white">{streakDays} Days</span>
              <span className="text-[11px] text-emerald-400 font-semibold block">Keep it burning!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Current Weight */}
        <div className="bg-surface border border-surface-border p-6 rounded-2xl hover:border-zinc-600 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Current Weight</span>
            <Scale className="w-4 h-4 text-neon-lime" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{profile.currentWeightKg}</span>
            <span className="text-sm font-bold text-zinc-400">kg</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
            <span>Started at:</span>
            <strong className="text-zinc-200">{profile.startingWeightKg} kg</strong>
          </div>
        </div>

        {/* Total Weight Shed */}
        <div className="bg-surface border border-surface-border p-6 rounded-2xl hover:border-zinc-600 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Total Shed</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-emerald-400">
              {totalLost > 0 ? `-${totalLost}` : '0.0'}
            </span>
            <span className="text-sm font-bold text-zinc-400">kg</span>
          </div>
          <div className="mt-3 text-xs text-emerald-400/90 font-medium">
            {totalLost > 0 ? `Shed ${totalLost} kg since day 1` : 'Track your first weigh-in'}
          </div>
        </div>

        {/* Goal Remaining */}
        <div className="bg-surface border border-surface-border p-6 rounded-2xl hover:border-zinc-600 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Distance To Goal</span>
            <Target className="w-4 h-4 text-accent-cyan" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{kgRemaining}</span>
            <span className="text-sm font-bold text-zinc-400">kg to go</span>
          </div>
          <div className="mt-3 text-xs text-zinc-400">
            Target Goal: <strong className="text-neon-lime">{profile.targetWeightKg} kg</strong>
          </div>
        </div>

        {/* Progress % */}
        <div className="bg-surface border border-surface-border p-6 rounded-2xl hover:border-zinc-600 transition-all">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase mb-2">
            <span>Goal Accomplished</span>
            <Award className="w-4 h-4 text-accent-orange" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-neon-lime">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-subtle h-2 rounded-full mt-3 overflow-hidden border border-surface-border">
            <div 
              className="bg-neon-lime h-full rounded-full transition-all duration-500 shadow-neon"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Weight Progress Chart & Timeline */}
      <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-neon-lime" />
              <span>Weight Loss Progression Curve</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Historical weigh-ins plotted against your {profile.targetWeightKg} kg goal line.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neon-lime" />
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
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-surface-subtle/40 rounded-2xl border border-dashed border-surface-border">
            <div className="w-12 h-12 rounded-2xl bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime mb-3">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white uppercase">No Weigh-Ins Recorded Yet</h4>
            <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-4">
              Log your initial weigh-in today to calculate your baseline BMI and start plotting your weight progression graph!
            </p>
            <button
              onClick={() => setShowLogModal(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-black uppercase bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon"
            >
              + Record Initial Weigh-In
            </button>
          </div>
        ) : (
          <div className="h-64 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.0" />
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
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.6"
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
                      <circle cx="300" cy={y} r={7} fill="#08090C" stroke="#CCFF00" strokeWidth="4" />
                      <text x="300" y={y - 14} textAnchor="middle" fill="#CCFF00" fontSize="12" fontWeight="bold">
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
                    {/* Fill */}
                    <path d={areaD} fill="url(#neonGradient)" />
                    {/* Stroke */}
                    <path d={pathD} fill="none" stroke="#CCFF00" strokeWidth="3" />
                    {/* Circles */}
                    {points.map((p, pIdx) => (
                      <g key={pIdx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={5}
                          fill="#08090C"
                          stroke="#CCFF00"
                          strokeWidth="3"
                          className="transition-all hover:scale-125"
                        />
                        <text
                          x={p.x}
                          y={p.y - 10}
                          textAnchor="middle"
                          fill="#F3F4F6"
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
        <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white uppercase">Daily Weigh-In Reminder</h4>
                <p className="text-xs text-zinc-400">Keep your habits strong and accountable</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={remindersOn}
                onChange={(e) => setRemindersOn(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-lime"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Preferred Reminder Time
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveReminderSettings}
                  className="px-4 py-2.5 bg-neon-lime text-background font-bold text-xs uppercase rounded-xl hover:bg-neon-limeHover shadow-neon"
                >
                  Save Time
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-xs text-zinc-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Sparkles className="w-4 h-4 text-neon-lime" />
                <span>Morning Routine Recommendation</span>
              </div>
              <p className="text-zinc-400">
                For maximum accuracy, weigh yourself immediately upon waking up, after using the restroom and before consuming food or water.
              </p>
              <button
                type="button"
                onClick={testDailyReminderPrompt}
                className="pt-1 text-xs text-neon-lime font-bold hover:underline flex items-center gap-1.5"
              >
                <span>Send Test Notification Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Habits & Check-in Status */}
        <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-surface-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white uppercase">Today&apos;s Daily Check-In</h4>
                <p className="text-xs text-zinc-400">Record your nutrition, workouts, and hydration</p>
              </div>
            </div>
            <button
              onClick={() => setShowCheckinModal(true)}
              className="text-xs font-bold text-neon-lime hover:underline"
            >
              + Check In
            </button>
          </div>

          <div className="space-y-3">
            {checkins.length === 0 ? (
              <div className="p-6 rounded-2xl bg-surface-subtle/50 border border-dashed border-surface-border text-center space-y-2">
                <span className="text-xs text-zinc-400 block">No daily check-ins recorded yet.</span>
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(true)}
                  className="text-xs text-neon-lime font-bold hover:underline"
                >
                  + Record First Check-In
                </button>
              </div>
            ) : (
              checkins.slice(-3).reverse().map((chk) => (
                <div
                  key={chk.id}
                  className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{chk.checkinDate}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface border border-surface-border text-neon-lime">
                        {chk.workoutCompleted ? chk.workoutType : 'Rest Day'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-sky-400" />
                        {chk.waterLiters}L Water
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
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
      <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="flex items-center justify-between pb-6 border-b border-surface-border">
          <div>
            <h3 className="text-xl font-bold text-white uppercase">Weigh-In History Log</h3>
            <p className="text-xs text-zinc-400">Every recorded metric with automatic BMI tracking</p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2 bg-surface-subtle hover:bg-surface-hover border border-surface-border rounded-xl text-xs font-bold text-white"
          >
            + New Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm mt-4">
            <thead>
              <tr className="border-b border-surface-border text-xs uppercase font-bold text-zinc-400">
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
                  <td colSpan={5} className="py-8 text-center text-xs text-zinc-400">
                    No weigh-in records found. Click &quot;+ New Entry&quot; or &quot;Log Weight (kg)&quot; to save your first measurement.
                  </td>
                </tr>
              ) : (
                weightLogs.slice().reverse().map((log) => (
                  <tr key={log.id} className="hover:bg-surface-subtle/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{log.loggedDate}</td>
                    <td className="py-3.5 px-4 font-bold text-neon-lime">{log.weightKg} kg</td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-300">{log.bmi}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-surface-subtle border border-surface-border text-zinc-300">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-zinc-400 max-w-xs truncate">
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
          <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto shadow-card">
            <h3 className="text-xl font-black text-white uppercase mb-2">Record Weigh-In</h3>
            <p className="text-xs text-zinc-400 mb-6">Enter your weight in kilograms for today.</p>

            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step={0.1}
                  required
                  value={inputWeight}
                  onChange={(e) => setInputWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-surface-subtle border border-surface-border rounded-xl text-white text-lg font-bold focus:outline-none focus:border-neon-lime"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                  Daily Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Fasted weigh-in, post-run"
                  value={inputNotes}
                  onChange={(e) => setInputNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-surface-subtle text-zinc-300 hover:bg-surface-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-black uppercase bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon"
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
          <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 max-w-md w-full relative my-auto max-h-[90vh] overflow-y-auto shadow-card">
            <h3 className="text-xl font-black text-white uppercase mb-2">Daily Check-In</h3>
            <p className="text-xs text-zinc-400 mb-6">Track your daily gym habits and wellness.</p>

            <form onSubmit={handleCheckinSubmit} className="space-y-4">
              
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-surface-subtle rounded-xl border border-surface-border">
                  <input
                    type="checkbox"
                    checked={checkinWorkout}
                    onChange={(e) => setCheckinWorkout(e.target.checked)}
                    className="w-5 h-5 accent-neon-lime rounded"
                  />
                  <span className="text-sm font-bold text-white uppercase">Did you work out today?</span>
                </label>
              </div>

              {checkinWorkout && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Workout Type</label>
                    <select
                      value={checkinWorkoutType}
                      onChange={(e) => setCheckinWorkoutType(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                    >
                      <option value="Strength">Strength / Weights</option>
                      <option value="Cardio">Cardio / Running</option>
                      <option value="HIIT">HIIT / Circuit</option>
                      <option value="Yoga">Yoga / Mobility</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={checkinDuration}
                      onChange={(e) => setCheckinDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Water Hydration: {checkinWater} Liters
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={6.0}
                  step={0.5}
                  value={checkinWater}
                  onChange={(e) => setCheckinWater(Number(e.target.value))}
                  className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer accent-neon-lime"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Energy Rating (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setCheckinEnergy(lvl)}
                      className={`flex-1 py-2 rounded-xl font-bold text-sm ${
                        checkinEnergy === lvl
                          ? 'bg-neon-lime text-background'
                          : 'bg-surface-subtle text-zinc-400 border border-surface-border'
                      }`}
                    >
                      {lvl}★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">Daily Reflection</label>
                <input
                  type="text"
                  placeholder="How did you feel today?"
                  value={checkinNotes}
                  onChange={(e) => setCheckinNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-surface-subtle text-zinc-300 hover:bg-surface-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-black uppercase bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon"
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
