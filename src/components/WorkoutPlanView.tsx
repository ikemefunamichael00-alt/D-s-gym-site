'use client';

import React, { useState, useEffect } from 'react';
import BodyTypeVisualizer from '@/components/BodyTypeVisualizer';
import { 
  BodyType, 
  FitnessGoal, 
  FITNESS_GOALS, 
  generate30DayPlan, 
  WorkoutPlan,
  DayRoutine 
} from '@/lib/workoutPlans';
import { 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Award, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  TrendingUp, 
  Dumbbell,
  Apple,
  Info
} from 'lucide-react';

interface WorkoutPlanViewProps {
  onJoinClick?: () => void;
}

export default function WorkoutPlanView({ onJoinClick }: WorkoutPlanViewProps) {
  const [selectedBodyType, setSelectedBodyType] = useState<BodyType>('heavy');
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>('lose_belly_fat');
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayRoutine | null>(null);

  // Generate initial plan on mount
  useEffect(() => {
    const generated = generate30DayPlan(selectedBodyType, selectedGoal);
    setPlan(generated);
    setSelectedDayDetail(generated.weeklySchedule[0].days[0]);

    // Load completed days from localStorage
    const saved = localStorage.getItem(`completed_days_${generated.id}`);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        setCompletedDays([]);
      }
    } else {
      setCompletedDays([]);
    }
  }, [selectedBodyType, selectedGoal]);

  const handleToggleDayComplete = (dayNum: number) => {
    if (!plan) return;
    setCompletedDays((prev) => {
      const next = prev.includes(dayNum)
        ? prev.filter((d) => d !== dayNum)
        : [...prev, dayNum];
      localStorage.setItem(`completed_days_${plan.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleResetProgress = () => {
    if (!plan) return;
    setCompletedDays([]);
    localStorage.removeItem(`completed_days_${plan.id}`);
  };

  const totalCompleted = completedDays.length;
  const progressPercent = Math.round((totalCompleted / 30) * 100);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-subtle border border-neon-lime/30 text-neon-lime text-xs font-bold uppercase tracking-wider glow-lime-subtle">
          <Calendar className="w-3.5 h-3.5 text-neon-lime" />
          <span>Scientific 30-Day Periodization</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Custom <span className="text-neon-lime">30-Day Workout</span> Planner
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Select your current starting body physique and desired transformation outcome. Our engine calculates your exact sets, reps, rest intervals, and daily nutrition targets.
        </p>
      </div>

      {/* STEP 1: Select Body Type with Interactive Animations */}
      <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-10 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-surface-border">
          <div>
            <span className="text-xs font-black uppercase text-neon-lime tracking-wider block">
              Step 1 of 2
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Select Your Current Body Type
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Each body type requires different training volume, metabolic pacing, and joint safety protocols.
            </p>
          </div>
          <span className="text-xs font-bold text-zinc-400">
            Current: <strong className="text-white uppercase">{selectedBodyType}</strong>
          </span>
        </div>

        {/* 3 Animated Figures Component */}
        <BodyTypeVisualizer
          selectedType={selectedBodyType}
          onSelect={(t) => setSelectedBodyType(t)}
        />
      </div>

      {/* STEP 2: Select 30-Day Goal */}
      <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-10 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-surface-border mb-6">
          <div>
            <span className="text-xs font-black uppercase text-accent-cyan tracking-wider block">
              Step 2 of 2
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Select Your 30-Day Transformation Goal
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose your primary training objective to configure daily exercise splits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FITNESS_GOALS.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                selectedGoal === g.id
                  ? 'bg-surface-subtle border-neon-lime shadow-neon ring-1 ring-neon-lime/40'
                  : 'bg-surface-subtle/50 border-surface-border hover:border-zinc-500 hover:bg-surface-subtle'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-surface border border-surface-border text-neon-lime">
                    {g.badge}
                  </span>
                  {selectedGoal === g.id && (
                    <CheckCircle2 className="w-4 h-4 text-neon-lime" />
                  )}
                </div>
                <h3 className="text-base font-black uppercase text-white group-hover:text-neon-lime transition-colors">
                  {g.title}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                  {g.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-border text-[11px] font-bold text-zinc-300">
                {g.tagline}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GENERATED 30-DAY PLAN DASHBOARD */}
      {plan && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Plan Summary Banner */}
          <div className="bg-gradient-to-r from-surface via-surface-subtle to-surface border-2 border-surface-border rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-neon-lime/10 text-neon-lime text-xs font-black uppercase border border-neon-lime/30">
                    {plan.goalTitle}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-surface-subtle text-zinc-300 text-xs font-bold uppercase border border-surface-border">
                    {plan.bodyTypeTitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Your 30-Day Transformation Protocol
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">
                  {plan.summary}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-emerald-400" />
                    <span>Nutrition Guidance: <strong className="text-white">{plan.recommendedCaloricPace}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-accent-cyan" />
                    <span>Frequency: <strong className="text-white">5 Workouts / 2 Rest Days per week</strong></span>
                  </div>
                </div>
              </div>

              {/* Progress Ring Widget */}
              <div className="bg-surface-subtle/80 border border-surface-border p-6 rounded-2xl flex flex-col items-center text-center shrink-0 min-w-[200px]">
                <span className="text-xs uppercase font-bold text-zinc-400 mb-1">Challenge Progress</span>
                <span className="text-4xl font-black text-neon-lime">{progressPercent}%</span>
                <span className="text-xs text-zinc-300 font-semibold mt-1">
                  {totalCompleted} of 30 Days Completed
                </span>
                <div className="w-full bg-surface h-2 rounded-full mt-3 overflow-hidden border border-surface-border">
                  <div
                    className="bg-neon-lime h-full rounded-full transition-all duration-500 shadow-neon"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {totalCompleted > 0 && (
                  <button
                    onClick={handleResetProgress}
                    className="mt-3 text-[10px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Progress</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Week Selection Tabs */}
          <div className="flex gap-2 p-1.5 bg-surface rounded-2xl border border-surface-border overflow-x-auto">
            {plan.weeklySchedule.map((w) => (
              <button
                key={w.week}
                onClick={() => setActiveWeek(w.week)}
                className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center ${
                  activeWeek === w.week
                    ? 'bg-neon-lime text-background shadow-neon font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-surface-subtle'
                }`}
              >
                <span>Week {w.week}</span>
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                  {w.days.filter((d) => completedDays.includes(d.day)).length}/{w.days.length} Done
                </span>
              </button>
            ))}
          </div>

          {/* Active Week Details & Daily Cards */}
          {(() => {
            const currentWeekData = plan.weeklySchedule.find((w) => w.week === activeWeek)!;
            return (
              <div className="space-y-6">
                <div className="bg-surface/50 border border-surface-border p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-white uppercase">{currentWeekData.weekTitle}</h4>
                    <p className="text-xs text-zinc-400">{currentWeekData.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-neon-lime shrink-0">
                    Click any day card to view the exact exercises
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentWeekData.days.map((day) => {
                    const isCompleted = completedDays.includes(day.day);
                    const isSelected = selectedDayDetail?.day === day.day;

                    return (
                      <div
                        key={day.day}
                        onClick={() => setSelectedDayDetail(day)}
                        className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-surface border-neon-lime shadow-card ring-1 ring-neon-lime/40'
                            : isCompleted
                            ? 'bg-surface/90 border-emerald-500/40'
                            : 'bg-surface/60 border-surface-border hover:border-zinc-500 hover:bg-surface'
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase text-neon-lime tracking-wider">
                              Day {day.day}
                            </span>
                            <div className="flex items-center gap-2">
                              {day.isRest ? (
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface-subtle text-accent-cyan border border-surface-border">
                                  Recovery
                                </span>
                              ) : (
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface-subtle text-accent-orange border border-surface-border flex items-center gap-1">
                                  <Flame className="w-3 h-3 text-accent-orange" />
                                  ~{day.estCaloriesBurned} kcal
                                </span>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-base font-bold text-white leading-snug">
                              {day.title.replace(`Day ${day.day}: `, '')}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                {day.durationMin} mins
                              </span>
                              {!day.isRest && (
                                <span className="flex items-center gap-1">
                                  <Dumbbell className="w-3.5 h-3.5 text-zinc-500" />
                                  {day.exercises.length} Exercises
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Completion Toggle */}
                        <div className="pt-5 mt-5 border-t border-surface-border flex items-center justify-between">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleDayComplete(day.day);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-surface-subtle text-zinc-400 hover:text-white border border-surface-border hover:bg-surface-hover'
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-zinc-500'}`} />
                            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                          </button>

                          <span className="text-xs text-zinc-400 flex items-center gap-1 group-hover:text-neon-lime">
                            <span>Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Detailed Exercise Breakdown of Selected Day */}
          {selectedDayDetail && (
            <div className="bg-surface border-2 border-surface-border rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
                <div>
                  <div className="flex items-center gap-2 text-neon-lime text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Day {selectedDayDetail.day} Detailed Exercise Routine</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                    {selectedDayDetail.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Duration: <strong className="text-white">{selectedDayDetail.durationMin} minutes</strong> • Estimated Burn: <strong className="text-neon-lime">~{selectedDayDetail.estCaloriesBurned} kcal</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleToggleDayComplete(selectedDayDetail.day)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                    completedDays.includes(selectedDayDetail.day)
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  <span>
                    {completedDays.includes(selectedDayDetail.day) ? 'Completed (Tap to undo)' : 'Mark Day Completed'}
                  </span>
                </button>
              </div>

              {/* Exercises List */}
              {selectedDayDetail.isRest ? (
                <div className="p-8 rounded-2xl bg-surface-subtle/50 border border-surface-border text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase">Active Recovery &amp; Muscle Repair</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    No heavy resistance training today. Take a 20-30 minute relaxed outdoor walk, perform gentle hamstring &amp; hip flexor stretching, and drink at least 3.5 liters of clean water.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs uppercase font-bold text-zinc-400 pb-2 border-b border-surface-border">
                    <span>Exercise Movement</span>
                    <span>Prescription</span>
                  </div>

                  <div className="divide-y divide-surface-border">
                    {selectedDayDetail.exercises.map((ex, exIdx) => (
                      <div key={exIdx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-surface-subtle border border-surface-border text-neon-lime text-xs font-black flex items-center justify-center shrink-0">
                              {exIdx + 1}
                            </span>
                            <span className="font-bold text-white text-base group-hover:text-neon-lime transition-colors">
                              {ex.name}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 pl-9 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <span>Form Cue: {ex.tip}</span>
                          </p>
                        </div>

                        <div className="pl-9 sm:pl-0 flex items-center gap-4 text-xs font-semibold">
                          <span className="px-3 py-1 rounded-xl bg-surface-subtle border border-surface-border text-white">
                            {ex.sets} Sets × {ex.reps}
                          </span>
                          <span className="px-3 py-1 rounded-xl bg-surface-subtle border border-surface-border text-zinc-400">
                            {ex.restSec}s Rest
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition Tip Box */}
              <div className="p-5 rounded-2xl bg-surface-subtle border border-neon-lime/30 flex items-start gap-3">
                <Apple className="w-5 h-5 text-neon-lime shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-neon-lime block">
                    Daily Nutrition &amp; Metabolism Tip
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedDayDetail.dailyNutritionTip}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
