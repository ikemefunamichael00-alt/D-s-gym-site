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
  initialWeight = 80,
  initialHeight = 175,
}: BmiCalculatorWidgetProps) {
  const [weightKg, setWeightKg] = useState<number>(initialWeight);
  const [heightCm, setHeightCm] = useState<number>(initialHeight);

  const analysis = analyzeHealthStatus(weightKg, heightCm);

  // Position indicator for the BMI spectrum (ranges roughly from 15 to 40)
  const spectrumPercentage = Math.min(Math.max(((analysis.bmi - 15) / (40 - 15)) * 100, 0), 100);

  return (
    <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-10 shadow-card max-w-4xl mx-auto relative overflow-hidden">
      
      {/* Background coral glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-coral/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-coral text-token-xs font-bold uppercase tracking-wider mb-2">
            <Scale className="w-4 h-4" />
            <span>WHO Metric Health Engine</span>
          </div>
          <h2 className="text-token-xl sm:text-token-2xl font-black text-white uppercase tracking-tight">
            BMI &amp; Weight Loss Advisor
          </h2>
          <p className="text-zinc-400 text-token-xs mt-1">
            Calculate your clinical Body Mass Index and exact target weight loss in kilograms.
          </p>
        </div>

        {/* BMI Score Pill (radius.sm=9999px) */}
        <div className="flex items-center gap-3 bg-surface-subtle px-5 py-3 rounded-token-sm border border-surface-border">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Current BMI</span>
            <span className="text-2xl sm:text-token-xl font-black text-white">{analysis.bmi}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-token-sm border text-[11px] font-black uppercase ${
            analysis.category === 'Normal'
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : analysis.category === 'Overweight'
              ? 'bg-brand-coral/15 text-brand-coral border-brand-coral/30'
              : analysis.category === 'Obese'
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
              : 'bg-sky-500/15 text-sky-400 border-sky-500/30'
          }`}>
            {analysis.category}
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        
        {/* Height in cm */}
        <div className="bg-surface-subtle/80 p-6 rounded-token-xs border border-surface-border">
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="height-slider" className="text-token-xs font-bold text-zinc-200 uppercase tracking-wide">
              Height
            </label>
            <div className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-token-xs border border-surface-border">
              <span className="text-token-lg font-black text-brand-coral">{heightCm}</span>
              <span className="text-token-xs font-bold text-zinc-400 uppercase">cm</span>
            </div>
          </div>
          <input
            id="height-slider"
            type="range"
            min={130}
            max={220}
            step={1}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full h-2 bg-surface-border rounded-token-xs appearance-none cursor-pointer accent-brand-coral"
            aria-label="Height in centimeters"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-2">
            <span>130 cm</span>
            <span>175 cm (Avg)</span>
            <span>220 cm</span>
          </div>
        </div>

        {/* Weight in kg */}
        <div className="bg-surface-subtle/80 p-6 rounded-token-xs border border-surface-border">
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="weight-slider" className="text-token-xs font-bold text-zinc-200 uppercase tracking-wide">
              Weight
            </label>
            <div className="flex items-center gap-1.5 bg-surface-card px-3 py-1 rounded-token-xs border border-surface-border">
              <span className="text-token-lg font-black text-brand-coral">{weightKg}</span>
              <span className="text-token-xs font-bold text-zinc-400 uppercase">kg</span>
            </div>
          </div>
          <input
            id="weight-slider"
            type="range"
            min={40}
            max={180}
            step={0.5}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full h-2 bg-surface-border rounded-token-xs appearance-none cursor-pointer accent-brand-coral"
            aria-label="Weight in kilograms"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-2">
            <span>40 kg</span>
            <span>75 kg</span>
            <span>180 kg</span>
          </div>
        </div>

      </div>

      {/* Visual BMI Gauge Spectrum */}
      <div className="bg-surface-subtle/40 p-5 rounded-token-xs border border-surface-border my-6">
        <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
          <span className="text-sky-400">Underweight (&lt;18.5)</span>
          <span className="text-emerald-400">Normal (18.5-24.9)</span>
          <span className="text-brand-coral">Overweight (25-29.9)</span>
          <span className="text-rose-500">Obese (≥30)</span>
        </div>
        <div className="relative h-4 rounded-token-sm overflow-hidden bg-zinc-800 flex">
          <div className="w-[14%] bg-sky-500" title="Underweight" />
          <div className="w-[30%] bg-emerald-500" title="Normal" />
          <div className="w-[25%] bg-brand-coral" title="Overweight" />
          <div className="w-[31%] bg-rose-600" title="Obese" />
        </div>
        {/* Needle pointer */}
        <div className="relative h-4 -mt-1 pointer-events-none">
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-fast"
            style={{ left: `${spectrumPercentage}%` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-brand-coral" />
            <span className="text-[10px] font-black text-white uppercase bg-brand-coral px-2 py-0.5 rounded-token-xs shadow-coral">
              BMI: {analysis.bmi}
            </span>
          </div>
        </div>
      </div>

      {/* Health Assessment & Actionable Loss Advice Banner */}
      <div className="mt-8 bg-gradient-to-r from-surface-subtle via-surface-card to-surface-subtle border border-surface-border rounded-token-xs p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              {analysis.category === 'Normal' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-brand-coral" />
              )}
              <h4 className="text-token-md font-bold text-white uppercase">
                {analysis.category === 'Normal'
                  ? 'Healthy Balance: Maintain With Universal Training'
                  : `Target Kilogram Deficit: ${analysis.weightDifferenceKg} kg`}
              </h4>
            </div>

            <p className="text-zinc-300 text-token-xs leading-relaxed">
              {analysis.recommendedAction}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-token-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-zinc-500" />
                Normal weight for {heightCm} cm: <strong className="text-white">{analysis.healthyWeightMin} kg – {analysis.healthyWeightMax} kg</strong>
              </span>
              {analysis.weightDifferenceKg > 0 && (
                <span className="text-brand-coral font-semibold">
                  Safe pace: ~0.5 kg / week
                </span>
              )}
            </div>
          </div>

          {onSaveToDashboard && (
            <button
              onClick={() => onSaveToDashboard(weightKg, heightCm)}
              className="w-full md:w-auto px-6 py-3.5 rounded-token-xs font-bold text-token-xs bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral transition-all duration-instant flex items-center justify-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Track in My Goals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
