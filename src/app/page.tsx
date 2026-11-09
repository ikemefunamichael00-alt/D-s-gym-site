'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BmiCalculatorWidget from '@/components/BmiCalculatorWidget';
import GymFeatures from '@/components/GymFeatures';
import DashboardView from '@/components/DashboardView';
import AuthModal from '@/components/AuthModal';
import { mockProfile, mockWeightLogs, mockDailyCheckins } from '@/lib/mockData';
import { UserProfile, WeightLog, DailyCheckin } from '@/types';
import { calculateBMI, getBMICategory } from '@/lib/bmi';
import { Dumbbell, ShieldCheck, Heart, Sparkles, Flame, CheckCircle } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'calculator'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default logged in for immediate interactive experience
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(mockWeightLogs);
  const [checkins, setCheckins] = useState<DailyCheckin[]>(mockDailyCheckins);
  
  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

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
    setProfile((prev) => ({
      ...prev,
      email: userData.email,
      fullName: userData.name,
      heightCm: userData.height,
      currentWeightKg: userData.weight,
      startingWeightKg: userData.weight,
      targetWeightKg: userData.targetWeight,
    }));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const handleAddWeightLog = (weightKg: number, notes?: string) => {
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
      // update if today already exists, otherwise append
      const filtered = prev.filter((l) => l.loggedDate !== today);
      return [...filtered, newLog].sort((a, b) => a.loggedDate.localeCompare(b.loggedDate));
    });

    setProfile((prev) => ({
      ...prev,
      currentWeightKg: weightKg,
    }));
  };

  const handleAddCheckin = (newCheckinData: Omit<DailyCheckin, 'id' | 'userId'>) => {
    const newCheckin: DailyCheckin = {
      id: `chk-${Date.now()}`,
      userId: profile.id,
      ...newCheckinData,
    };
    setCheckins((prev) => [
      ...prev.filter((c) => c.checkinDate !== newCheckin.checkinDate),
      newCheckin,
    ]);
  };

  const handleUpdateReminder = (time: string, enabled: boolean) => {
    setProfile((prev) => ({
      ...prev,
      dailyReminderTime: time,
      remindersEnabled: enabled,
    }));
  };

  const handleEditProfileMetrics = (height: number, target: number) => {
    setProfile((prev) => ({
      ...prev,
      heightCm: height,
      targetWeightKg: target,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col justify-between selection:bg-neon-lime selection:text-background">
      
      {/* Top Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={profile.fullName}
        activeTab={activeTab}
        onNavigate={(tab) => {
          if (tab === 'dashboard' && !isLoggedIn) {
            handleOpenAuth('login');
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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
            />

            {/* Quick Interactive BMI Widget on Landing Page */}
            <section className="py-16 px-4 bg-gradient-to-b from-transparent via-surface-subtle/30 to-background">
              <div className="max-w-7xl mx-auto text-center mb-8">
                <span className="text-neon-lime text-xs font-black uppercase tracking-wider block mb-2">
                  Interactive Health Gauge
                </span>
                <h2 className="text-3xl font-black text-white uppercase">
                  Test Your Kilograms &amp; Target Advice
                </h2>
              </div>
              <BmiCalculatorWidget
                initialHeight={profile.heightCm}
                initialWeight={profile.currentWeightKg}
                onSaveToDashboard={(w, h) => {
                  setProfile((prev) => ({ ...prev, currentWeightKg: w, heightCm: h }));
                  if (isLoggedIn) {
                    handleAddWeightLog(w, 'Updated from BMI calculator');
                    setActiveTab('dashboard');
                  } else {
                    handleOpenAuth('signup');
                  }
                }}
              />
            </section>

            {/* Gym Classes & Pricing */}
            <GymFeatures
              onJoinClick={() => handleOpenAuth('signup')}
            />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="py-16 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-neon-lime text-xs font-bold uppercase tracking-wider">
                WHO Clinical Reference
              </span>
              <h1 className="text-4xl font-black text-white uppercase">
                BMI &amp; Weight Loss Advisory Center
              </h1>
              <p className="text-zinc-400 text-sm">
                Understand your Body Mass Index score, healthy ranges for your height in cm, and the scientific rate of recommended weight loss.
              </p>
            </div>

            <BmiCalculatorWidget
              initialHeight={profile.heightCm}
              initialWeight={profile.currentWeightKg}
              onSaveToDashboard={(w, h) => {
                setProfile((prev) => ({ ...prev, currentWeightKg: w, heightCm: h }));
                if (isLoggedIn) {
                  handleAddWeightLog(w, 'Updated from calculator');
                  setActiveTab('dashboard');
                } else {
                  handleOpenAuth('signup');
                }
              }}
            />

            {/* Educational Info Card */}
            <div className="bg-surface border border-surface-border rounded-3xl p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-neon-lime" />
                  <span>The Metric Standard</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Calculated by taking weight in kilograms divided by the square of height in meters: BMI = weight (kg) / (height in meters)².
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-orange" />
                  <span>Safe Fat Loss Rate</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Losing 0.5 kg to 1.0 kg per week protects lean skeletal muscle mass while optimizing fat metabolism and metabolic health.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-cyan" />
                  <span>Daily Accountability</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Consistency beats intensity. Weighing in daily smooths out hydration fluctuations and reinforces healthy habits.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            weightLogs={weightLogs}
            checkins={checkins}
            onAddWeightLog={handleAddWeightLog}
            onAddCheckin={handleAddCheckin}
            onUpdateReminder={handleUpdateReminder}
            onEditProfileMetrics={handleEditProfileMetrics}
          />
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
      <footer className="bg-surface/80 border-t border-surface-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon-lime flex items-center justify-center text-background font-black shadow-neon">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block uppercase">
                  D&apos;s <span className="text-neon-lime">GYM</span>
                </span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                  Built with Supabase &amp; Vercel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-zinc-400">
              <button onClick={() => setActiveTab('home')} className="hover:text-neon-lime transition-colors">Overview</button>
              <button onClick={() => setActiveTab('calculator')} className="hover:text-neon-lime transition-colors">BMI Advisor</button>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-neon-lime transition-colors">Member Tracker</button>
              <span className="text-zinc-600">|</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Supabase RLS Protected
              </span>
            </div>

            <div className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} D&apos;s Gym. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
