'use client';

import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Target, Zap, TrendingDown, Scale } from 'lucide-react';

interface HeroProps {
  onStartTracking: () => void;
  onOpenCalculator: () => void;
}

export default function Hero({ onStartTracking, onOpenCalculator }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-neon-lime/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-subtle border border-neon-lime/30 text-neon-lime text-xs font-bold uppercase tracking-wider glow-lime-subtle">
            <Zap className="w-3.5 h-3.5 fill-neon-lime" />
            <span>Next-Gen Weight Loss & Gym Tracker</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08]">
            Shed The Fat. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-lime via-lime-300 to-emerald-400">
              Own The Result.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Input your height and weight in kilograms. Instantly get medical-grade BMI insights, an exact target advisory on how many kilograms to lose, and daily check-ins to stay accountable.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTracking}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-base uppercase tracking-wider bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <span>Start Member Tracker</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-surface-subtle border border-surface-border text-white hover:bg-surface-hover hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
            >
              <Scale className="w-5 h-5 text-neon-lime" />
              <span>Instant Free BMI Check</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neon-lime" />
              <span>Powered by Supabase Security</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-accent-cyan" />
              <span>Accurate WHO Metric Standards (kg & cm)</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent-orange" />
              <span>Daily Check-ins & Streak Motivator</span>
            </div>
          </div>

        </div>

        {/* Highlight Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl hover:border-neon-lime/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-neon-lime/10 border border-neon-lime/20 flex items-center justify-center text-neon-lime mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart BMI & Target Advice</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Calculates whether you are underweight, normal, overweight, or obese. Tells you the exact kilograms recommended to shed to reach your healthiest body.
            </p>
          </div>

          <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl hover:border-accent-cyan/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Goal Tracker & Projections</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Set your target weight in kg. Follow dynamic visual progression rings, estimated timeline forecast, and weekly loss rate averages.
            </p>
          </div>

          <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl hover:border-accent-orange/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center text-accent-orange mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Daily Check-Ins & Reminders</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Log daily weight, hydration, and workout status. Build an unstoppable streak with customized morning reminder notifications.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
