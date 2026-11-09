'use client';

import React, { useState } from 'react';
import { analyzeHealthStatus } from '@/lib/bmi';
import { Scale, Info, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

interface BmiCalculatorWidgetProps {
  onSaveToDashboard?: (weight: number, height: number) => void;
  initialWeight?: number;
  initialHeight?: number;
}

export default function BmiCalculatorWidget({
  onSaveToDashboard,
  initialWeight = 84,
  initialHeight = 178,
}: BmiCalculatorWidgetProps) {
  const [weightKg, setWeightKg] = useState<number>(initialWeight);
  const [heightCm, setHeightCm] = useState<number>(initialHeight);

  const analysis = analyzeHealthStatus(weightKg, heightCm);

  // Position indicator for the BMI spectrum (ranges roughly from 15 to 40)
  const spectrumPercentage = Math.min(Math.max(((analysis.bmi - 15) / (40 - 15)) * 100, 0), 100);

  return (
    <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-10 shadow-card max-w-4xl mx-auto relative overflow-hidden">
      
      {/* Background neon glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-neon-lime/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 text-neon-lime text-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>WHO Metric Health Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            BMI & Weight Loss Advisor
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Calculate your status instantly using height and weight in kilograms.
          </p>
        </div>

        {/* BMI Score Pill */}
        <div className="flex items-center gap-3 bg-surface-subtle px-5 py-3 rounded-2xl border border-surface-border">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block">Current BMI</span>
            <span className="text-3xl font-black text-white">{analysis.bmi}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase ${analysis.badgeColor}`}>
            {analysis.category}
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        
        {/* Height in cm */}
        <div className="bg-surface-subtle/60 p-6 rounded-2xl border border-surface-border">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
              Height
            </label>
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1 rounded-lg border border-surface-border">
              <span className="text-xl font-black text-neon-lime">{heightCm}</span>
              <span className="text-xs font-bold text-zinc-400 uppercase">cm</span>
            </div>
          </div>
          <input
            type="range"
            min={130}
            max={220}
            step={1}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer accent-neon-lime"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-2">
            <span>130 cm</span>
            <span>175 cm (Avg)</span>
            <span>220 cm</span>
          </div>
        </div>

        {/* Weight in kg */}
        <div className="bg-surface-subtle/60 p-6 rounded-2xl border border-surface-border">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-bold text-zinc-200 uppercase tracking-wide">
              Weight
            </label>
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1 rounded-lg border border-surface-border">
              <span className="text-xl font-black text-neon-lime">{weightKg}</span>
              <span className="text-xs font-bold text-zinc-400 uppercase">kg</span>
            </div>
          </div>
          <input
            type="range"
            min={40}
            max={180}
            step={0.5}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full h-2 bg-surface-border rounded-lg appearance-none cursor-pointer accent-neon-lime"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-2">
            <span>40 kg</span>
            <span>75 kg</span>
            <span>180 kg</span>
          </div>
        </div>

      </div>

      {/* Visual BMI Gauge Spectrum */}
      <div className="bg-surface-subtle/40 p-5 rounded-2xl border border-surface-border my-6">
        <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          <span>Underweight (&lt;18.5)</span>
          <span className="text-emerald-400">Normal (18.5-24.9)</span>
          <span className="text-amber-400">Overweight (25-29.9)</span>
          <span className="text-rose-400">Obese (≥30)</span>
        </div>
        <div className="relative h-4 rounded-full overflow-hidden bg-zinc-800 flex">
          <div className="w-[14%] bg-sky-500" title="Underweight" />
          <div className="w-[30%] bg-emerald-500" title="Normal" />
          <div className="w-[25%] bg-amber-500" title="Overweight" />
          <div className="w-[31%] bg-rose-600" title="Obese" />
        </div>
        {/* Needle pointer */}
        <div className="relative h-4 -mt-1 pointer-events-none">
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
            style={{ left: `${spectrumPercentage}%` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-neon-lime" />
            <span className="text-[10px] font-black text-neon-lime uppercase bg-background/90 px-1.5 py-0.5 rounded shadow">
              You: {analysis.bmi}
            </span>
          </div>
        </div>
      </div>

      {/* Health Assessment & Actionable Loss Advice Banner */}
      <div className="mt-8 bg-gradient-to-r from-surface-subtle via-surface-subtle to-surface border border-surface-border rounded-2xl p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              {analysis.category === 'Normal' ? (
                <CheckCircle2 className="w-5 h-5 text-neon-lime" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              )}
              <h4 className="text-lg font-bold text-white">
                {analysis.category === 'Normal'
                  ? 'Great Balance! You are in the Healthy Range'
                  : `Target Weight Loss Advisory: ${analysis.weightDifferenceKg} kg`}
              </h4>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">
              {analysis.recommendedAction}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-zinc-500" />
                Normal weight for {heightCm} cm: <strong className="text-zinc-200">{analysis.healthyWeightMin} kg – {analysis.healthyWeightMax} kg</strong>
              </span>
              {analysis.weightDifferenceKg > 0 && (
                <span className="text-neon-lime font-semibold">
                  Safe pace: ~0.5 kg / week
                </span>
              )}
            </div>
          </div>

          {onSaveToDashboard && (
            <button
              onClick={() => onSaveToDashboard(weightKg, heightCm)}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Track This in My Goals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
