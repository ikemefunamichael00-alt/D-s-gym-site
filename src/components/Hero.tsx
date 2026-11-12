'use client';

import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Target, Zap, TrendingDown, Scale, Globe, Dumbbell } from 'lucide-react';

interface HeroProps {
  onStartTracking: () => void;
  onOpenCalculator: () => void;
  onOpenPlanner?: () => void;
}

export default function Hero({ onStartTracking, onOpenCalculator, onOpenPlanner }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background radial glow using brand coral token #ff6b6b */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-brand-coral/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[280px] h-[280px] bg-accent-orange/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Brand Tag Pill (radius.sm=9999px) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-token-sm bg-surface-card border border-brand-coral/40 text-brand-coral text-token-xs font-bold uppercase tracking-wider glow-coral-subtle">
            <Globe className="w-3.5 h-3.5 text-brand-coral" />
            <span>anygym — Universal Gym Membership &amp; Tracker</span>
          </div>

          {/* Main Title (font.size.3xl=60px per DESIGN.md) */}
          <h1 className="text-4xl sm:text-5xl lg:text-token-3xl font-black tracking-tight text-white uppercase leading-[1.08]">
            One Membership. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral via-[#ff8787] to-[#ffa8a8]">
              Every Gym. Total Freedom.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-token-sm sm:text-token-md text-zinc-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Universal gym access combined with intelligent metric tracking. Input your height and weight in kilograms to instantly receive WHO-standard BMI analysis, exact kilogram loss targets, and a personalized 30-day transformation plan.
          </p>

          {/* CTAs (radius.xs=8px per DESIGN.md) */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTracking}
              className="w-full sm:w-auto px-8 py-4 rounded-token-xs font-black text-token-xs uppercase tracking-wider bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral transition-all duration-instant transform hover:-translate-y-0.5 flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Start Member Tracker</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-7 py-4 rounded-token-xs font-bold text-token-xs bg-surface-card border border-surface-border text-white hover:bg-surface-hover hover:border-brand-coral transition-all duration-instant flex items-center justify-center gap-2"
            >
              <Scale className="w-5 h-5 text-brand-coral" />
              <span>Instant BMI Check</span>
            </button>
            {onOpenPlanner && (
              <button
                onClick={onOpenPlanner}
                className="w-full sm:w-auto px-7 py-4 rounded-token-xs font-bold text-token-xs bg-surface-subtle border border-surface-border text-white hover:bg-surface-hover hover:border-accent-cyan transition-all duration-instant flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-accent-cyan" />
                <span>30-Day Physique Plan</span>
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-token-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-coral" />
              <span>Universal Partner Access</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>WHO Metric Precision (kg &amp; cm)</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent-orange" />
              <span>Daily Check-ins &amp; Habit Streaks</span>
            </div>
          </div>

        </div>

        {/* Feature Cards Grid (radius.xs=8px) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-surface-card border border-surface-border p-7 rounded-token-xs hover:border-brand-coral/50 transition-all duration-fast">
            <div className="w-12 h-12 rounded-token-xs bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-token-md font-bold text-white mb-2 uppercase">Smart BMI &amp; Kilogram Deficit</h3>
            <p className="text-zinc-400 text-token-xs leading-relaxed">
              Calculates whether you are underweight, normal, overweight, or obese. Tells you the exact kilograms recommended to shed to enter the WHO healthy weight bracket.
            </p>
          </div>

          <div className="bg-surface-card border border-surface-border p-7 rounded-token-xs hover:border-accent-cyan/50 transition-all duration-fast">
            <div className="w-12 h-12 rounded-token-xs bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-token-md font-bold text-white mb-2 uppercase">Custom 30-Day Periodization</h3>
            <p className="text-zinc-400 text-token-xs leading-relaxed">
              Tailored for 3 distinct body physiques (excess weight &amp; big stomach, medium build, or slim frame). 4 specific tracks for belly fat, weight loss, 6-packs, and muscle gain.
            </p>
          </div>

          <div className="bg-surface-card border border-surface-border p-7 rounded-token-xs hover:border-accent-orange/50 transition-all duration-fast">
            <div className="w-12 h-12 rounded-token-xs bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-token-md font-bold text-white mb-2 uppercase">Daily Check-Ins &amp; Reminders</h3>
            <p className="text-zinc-400 text-token-xs leading-relaxed">
              Log daily weigh-ins, workout status, hydration, and energy ratings. Keep accountability with custom browser push reminders and streak tracking.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
