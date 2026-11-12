'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BmiCalculatorWidget from '@/components/BmiCalculatorWidget';
import GymFeatures from '@/components/GymFeatures';
import DashboardView from '@/components/DashboardView';
import WorkoutPlanView from '@/components/WorkoutPlanView';
import AuthModal from '@/components/AuthModal';
import { UserProfile, WeightLog, DailyCheckin } from '@/types';
import { calculateBMI, getBMICategory } from '@/lib/bmi';
import { createClient } from '@/lib/supabase/client';
import { Dumbbell, ShieldCheck, Sparkles, Lock, ArrowRight, UserCheck, Calendar, Globe } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'calculator' | 'workout-plan'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [checkins, setCheckins] = useState<DailyCheckin[]>([]);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Supabase real-time auth check on mount
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsLoggedIn(true);
        const meta = session.user.user_metadata || {};
        const registeredHeight = Number(meta.height_cm) || 175;
        const registeredWeight = Number(meta.weight_kg) || Number(meta.starting_weight_kg) || 80;
        const registeredTarget = Number(meta.target_weight_kg) || 70;

        const userProf: UserProfile = {
          id: session.user.id,
          email: session.user.email || 'athlete@anygym.com',
          fullName: meta.full_name || 'Gym Athlete',
          heightCm: registeredHeight,
          startingWeightKg: registeredWeight,
          currentWeightKg: registeredWeight,
          targetWeightKg: registeredTarget,
          gender: 'unspecified',
          dailyReminderTime: '08:00',
          remindersEnabled: true,
          membershipTier: 'Universal Pass Holder',
          createdAt: session.user.created_at,
        };
        setProfile(userProf);

        supabase.from('weight_logs').select('*').eq('user_id', session.user.id).order('logged_date', { ascending: true })
          .then(({ data: logs }) => {
            if (logs && logs.length > 0) {
              setWeightLogs(logs.map((l: any) => ({
                id: l.id,
                userId: l.user_id,
                weightKg: Number(l.weight_kg),
                bmi: Number(l.bmi),
                category: l.category,
                notes: l.notes,
                loggedDate: l.logged_date,
              })));
              const latestLog = logs[logs.length - 1];
              setProfile((p) => p ? { ...p, currentWeightKg: Number(latestLog.weight_kg) } : p);
            } else {
              const initialBmi = calculateBMI(registeredWeight, registeredHeight);
              const initialCat = getBMICategory(initialBmi);
              const initialLog: WeightLog = {
                id: `log-${Date.now()}`,
                userId: session.user.id,
                weightKg: registeredWeight,
                bmi: initialBmi,
                category: initialCat,
                notes: 'Initial enrollment weigh-in',
                loggedDate: new Date().toISOString().split('T')[0],
              };
              setWeightLogs([initialLog]);
            }
          });

        supabase.from('daily_checkins').select('*').eq('user_id', session.user.id).order('checkin_date', { ascending: true })
          .then(({ data: chks }) => {
            if (chks && chks.length > 0) {
              setCheckins(chks.map((c: any) => ({
                id: c.id,
                userId: c.user_id,
                checkinDate: c.checkin_date,
                workoutCompleted: c.workout_completed,
                workoutType: c.workout_type,
                workoutDurationMin: c.workout_duration_min,
                waterLiters: Number(c.water_liters),
                energyRating: c.energy_rating,
                dietFollowed: c.diet_followed,
                notes: c.notes,
              })));
            }
          });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setProfile(null);
        setWeightLogs([]);
        setCheckins([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (userData: {
    email: string;
    name: string;
    height: number;
    weight: number;
    targetWeight: number;
  }) => {
    setIsLoggedIn(true);

    const initialBmi = calculateBMI(userData.weight, userData.height);
    const initialCat = getBMICategory(initialBmi);
    const today = new Date().toISOString().split('T')[0];

    const newProf: UserProfile = {
      id: 'usr_' + Date.now(),
      email: userData.email,
      fullName: userData.name,
      heightCm: userData.height,
      startingWeightKg: userData.weight,
      currentWeightKg: userData.weight,
      targetWeightKg: userData.targetWeight,
      gender: 'unspecified',
      dailyReminderTime: '08:00',
      remindersEnabled: true,
      membershipTier: 'Universal Pass Holder',
      createdAt: new Date().toISOString(),
    };
    setProfile(newProf);

    const initialLog: WeightLog = {
      id: `log-${Date.now()}`,
      userId: newProf.id,
      weightKg: userData.weight,
      bmi: initialBmi,
      category: initialCat,
      notes: 'Initial enrollment weigh-in',
      loggedDate: today,
    };
    setWeightLogs([initialLog]);

    setActiveTab('dashboard');
  };

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsLoggedIn(false);
    setProfile(null);
    setWeightLogs([]);
    setCheckins([]);
    setActiveTab('home');
  };

  const handleAddWeightLog = (weightKg: number, notes?: string) => {
    if (!profile) return;
    const today = new Date().toISOString().split('T')[0];
    const bmi = calculateBMI(weightKg, profile.heightCm);
    const category = getBMICategory(bmi);

    const newLog: WeightLog = {
      id: `log-${Date.now()}`,
      userId: profile.id,
      weightKg,
      bmi,
      category,
      notes,
      loggedDate: today,
    };

    setWeightLogs((prev) => {
      const filtered = prev.filter((l) => l.loggedDate !== today);
      return [...filtered, newLog].sort((a, b) => a.loggedDate.localeCompare(b.loggedDate));
    });

    setProfile((prev) => prev ? ({
      ...prev,
      currentWeightKg: weightKg,
    }) : null);

    const supabase = createClient();
    if (supabase && isLoggedIn) {
      supabase.from('weight_logs').upsert({
        user_id: profile.id,
        weight_kg: weightKg,
        bmi,
        category,
        notes: notes || '',
        logged_date: today,
      }).then(({ error }) => {
        if (error) console.info('Supabase weight log sync notice:', error.message);
      });
    }
  };

  const handleAddCheckin = (newCheckinData: Omit<DailyCheckin, 'id' | 'userId'>) => {
    if (!profile) return;
    const newCheckin: DailyCheckin = {
      id: `chk-${Date.now()}`,
      userId: profile.id,
      ...newCheckinData,
    };
    setCheckins((prev) => [
      ...prev.filter((c) => c.checkinDate !== newCheckin.checkinDate),
      newCheckin,
    ]);

    const supabase = createClient();
    if (supabase && isLoggedIn) {
      supabase.from('daily_checkins').upsert({
        user_id: profile.id,
        checkin_date: newCheckin.checkinDate,
        workout_completed: newCheckin.workoutCompleted,
        workout_type: newCheckin.workoutType,
        workout_duration_min: newCheckin.workoutDurationMin,
        water_liters: newCheckin.waterLiters,
        energy_rating: newCheckin.energyRating,
        diet_followed: newCheckin.dietFollowed,
        notes: newCheckin.notes || '',
      }).then(({ error }) => {
        if (error) console.info('Supabase checkin sync notice:', error.message);
      });
    }
  };

  const handleUpdateReminder = (time: string, enabled: boolean) => {
    setProfile((prev) => prev ? ({
      ...prev,
      dailyReminderTime: time,
      remindersEnabled: enabled,
    }) : null);
  };

  const handleEditProfileMetrics = (height: number, target: number) => {
    setProfile((prev) => prev ? ({
      ...prev,
      heightCm: height,
      targetWeightKg: target,
    }) : null);
  };

  return (
    <div className="min-h-screen bg-surface-base text-zinc-100 flex flex-col justify-between selection:bg-brand-coral selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={profile?.fullName || 'Athlete'}
        activeTab={activeTab}
        onNavigate={(tab) => {
          if (tab === 'dashboard' && !isLoggedIn) {
            handleOpenAuth('signup');
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* LANDING PAGE */}
        {activeTab === 'home' && (
          <div>
            <Hero
              onStartTracking={() => {
                if (isLoggedIn) {
                  setActiveTab('dashboard');
                } else {
                  handleOpenAuth('signup');
                }
              }}
              onOpenCalculator={() => setActiveTab('calculator')}
              onOpenPlanner={() => setActiveTab('workout-plan')}
            />

            {/* Public Interactive BMI Widget */}
            <section className="py-16 px-4 bg-gradient-to-b from-transparent via-surface-card/40 to-surface-base">
              <div className="max-w-7xl mx-auto text-center mb-8">
                <span className="text-brand-coral text-token-xs font-black uppercase tracking-wider block mb-2">
                  Clinical Metric Gauge
                </span>
                <h2 className="text-3xl sm:text-token-2xl font-black text-white uppercase">
                  Test Your Kilograms &amp; Target Advice
                </h2>
              </div>
              <BmiCalculatorWidget
                initialHeight={profile?.heightCm || 175}
                initialWeight={profile?.currentWeightKg || 80}
                onSaveToDashboard={(w, h) => {
                  if (isLoggedIn && profile) {
                    handleAddWeightLog(w, 'Updated from BMI calculator');
                    setActiveTab('dashboard');
                  } else {
                    handleOpenAuth('signup');
                  }
                }}
              />
            </section>

            {/* 30-Day Transformation Challenge Teaser Banner on Landing Page */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-surface-card via-surface-subtle to-surface-card border-2 border-brand-coral/40 rounded-token-xs p-8 sm:p-12 shadow-card flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-coral/10 blur-[100px] pointer-events-none" />
                <div className="space-y-4 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-token-sm bg-brand-coral/15 border border-brand-coral/30 text-brand-coral text-token-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
                    <span>30-Day Visual Physique Planner</span>
                  </div>
                  <h2 className="text-3xl sm:text-token-2xl font-black text-white uppercase tracking-tight">
                    Custom 30-Day Workout Plans For Every Body Type
                  </h2>
                  <p className="text-zinc-300 text-token-xs sm:text-token-sm leading-relaxed">
                    Choose your starting physique from 3 animated models (excess weight &amp; big stomach, medium build, or slim frame). Generate an exact day-by-day protocol to lose overall weight, burn belly fat, sculpt 6-pack abs, or pack on muscle mass.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-token-xs font-semibold text-zinc-400">
                    <span className="px-3 py-1.5 rounded-token-xs bg-surface-card border border-surface-border text-brand-coral">
                      🔥 Big Stomach &amp; Heavy Build
                    </span>
                    <span className="px-3 py-1.5 rounded-token-xs bg-surface-card border border-surface-border text-accent-orange">
                      ⚡ Medium Athletic Build
                    </span>
                    <span className="px-3 py-1.5 rounded-token-xs bg-surface-card border border-surface-border text-accent-cyan">
                      💪 Slim Hypertrophy Build
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('workout-plan')}
                  className="px-8 py-4 rounded-token-xs font-black uppercase text-token-xs tracking-wider bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral transition-all duration-instant flex items-center gap-3 shrink-0 transform hover:-translate-y-0.5 relative z-10"
                >
                  <Calendar className="w-5 h-5 text-white" />
                  <span>Generate 30-Day Plan</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </section>

            {/* Universal Memberships & How It Works */}
            <GymFeatures
              onJoinClick={() => handleOpenAuth('signup')}
            />
          </div>
        )}

        {/* 30-DAY WORKOUT PLANNER VIEW */}
        {activeTab === 'workout-plan' && (
          <WorkoutPlanView
            onJoinClick={() => handleOpenAuth('signup')}
          />
        )}

        {/* BMI ADVISOR VIEW */}
        {activeTab === 'calculator' && (
          <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-brand-coral text-token-xs font-bold uppercase tracking-wider">
                WHO Clinical Reference
              </span>
              <h1 className="text-4xl sm:text-token-2xl font-black text-white uppercase">
                BMI &amp; Weight Loss Advisory Center
              </h1>
              <p className="text-zinc-400 text-token-xs">
                Understand your Body Mass Index score, healthy ranges for your height in cm, and the scientific rate of recommended weight loss.
              </p>
            </div>

            <BmiCalculatorWidget
              initialHeight={profile?.heightCm || 175}
              initialWeight={profile?.currentWeightKg || 80}
              onSaveToDashboard={(w, h) => {
                if (isLoggedIn && profile) {
                  handleAddWeightLog(w, 'Updated from calculator');
                  setActiveTab('dashboard');
                } else {
                  handleOpenAuth('signup');
                }
              }}
            />

            {/* Educational Info Card */}
            <div className="bg-surface-card border border-surface-border rounded-token-xs p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-token-xs flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand-coral" />
                  <span>The Metric Standard</span>
                </h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  Calculated by taking weight in kilograms divided by the square of height in meters: BMI = weight (kg) / (height in meters)².
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-token-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-orange" />
                  <span>Safe Fat Loss Rate</span>
                </h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  Losing 0.5 kg to 1.0 kg per week protects lean skeletal muscle mass while optimizing fat metabolism and metabolic health.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-token-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-cyan" />
                  <span>Daily Accountability</span>
                </h4>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  Consistency beats intensity. Weighing in daily smooths out hydration fluctuations and reinforces healthy habits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD VIEW (Compulsory Authentication Guard) */}
        {activeTab === 'dashboard' && (
          <div>
            {isLoggedIn && profile ? (
              <DashboardView
                profile={profile}
                weightLogs={weightLogs}
                checkins={checkins}
                onAddWeightLog={handleAddWeightLog}
                onAddCheckin={handleAddCheckin}
                onUpdateReminder={handleUpdateReminder}
                onEditProfileMetrics={handleEditProfileMetrics}
              />
            ) : (
              <div className="py-24 px-4 max-w-xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-token-xs bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral mx-auto glow-coral-subtle">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-token-xl font-black text-white uppercase">
                  Authentication Required
                </h2>
                <p className="text-zinc-400 text-token-xs leading-relaxed">
                  To view and track your personal weight loss progress, BMI analytics, and daily habits, you must sign in or create an account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <button
                    onClick={() => handleOpenAuth('signup')}
                    className="px-6 py-3.5 rounded-token-xs font-black uppercase text-token-xs tracking-wider bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral flex items-center justify-center gap-2"
                  >
                    <span>Register New Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-6 py-3.5 rounded-token-xs font-bold uppercase text-token-xs tracking-wider bg-surface-subtle border border-surface-border text-white hover:bg-surface-hover"
                  >
                    Sign In Existing Account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <footer className="bg-surface-card border-t border-surface-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-token-xs bg-brand-coral flex items-center justify-center text-white font-black shadow-coral">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-token-md font-black tracking-tight text-white block uppercase">
                  any<span className="text-brand-coral">gym</span>
                </span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                  Universal Gym Membership
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-token-xs text-zinc-400">
              <button onClick={() => setActiveTab('home')} className="hover:text-brand-coral transition-colors duration-instant">Overview</button>
              <button onClick={() => setActiveTab('calculator')} className="hover:text-brand-coral transition-colors duration-instant">BMI Advisor</button>
              <button onClick={() => setActiveTab('workout-plan')} className="hover:text-brand-coral transition-colors duration-instant">30-Day Plan</button>
              <button 
                onClick={() => {
                  if (isLoggedIn) setActiveTab('dashboard');
                  else handleOpenAuth('signup');
                }} 
                className="hover:text-brand-coral transition-colors duration-instant"
              >
                Member Tracker
              </button>
              <span className="text-zinc-600">|</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Supabase Protected
              </span>
            </div>

            <div className="text-[12px] text-zinc-500">
              &copy; {new Date().getFullYear()} anygym — Universal Gym Membership. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
