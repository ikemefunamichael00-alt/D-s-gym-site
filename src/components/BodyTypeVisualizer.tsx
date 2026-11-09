'use client';

import React from 'react';
import { BodyType } from '@/lib/workoutPlans';
import { Flame, Activity, Zap } from 'lucide-react';

interface BodyTypeVisualizerProps {
  selectedType: BodyType;
  onSelect: (type: BodyType) => void;
}

export default function BodyTypeVisualizer({
  selectedType,
  onSelect,
}: BodyTypeVisualizerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      
      {/* 1. Heavy / Big Stomach Person */}
      <div
        onClick={() => onSelect('heavy')}
        className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
          selectedType === 'heavy'
            ? 'bg-surface border-accent-orange shadow-card glow-lime-subtle ring-2 ring-accent-orange/40'
            : 'bg-surface/60 border-surface-border hover:border-zinc-500 hover:bg-surface'
        }`}
      >
        {selectedType === 'heavy' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-accent-orange/20 text-accent-orange border border-accent-orange/30">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Excess Weight & Big Stomach */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]"
          >
            <defs>
              <linearGradient id="heavyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#CC3300" />
              </linearGradient>
              <radialGradient id="stomachGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFAA00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF4400" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="48" ry="8" fill="#161922" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="38" r="18" fill="url(#heavyGrad)" />
            {/* Double chin / heavy jaw accent */}
            <ellipse cx="80" cy="50" rx="14" ry="7" fill="#E65100" opacity="0.7" />

            {/* Neck */}
            <rect x="71" y="52" width="18" height="12" rx="4" fill="url(#heavyGrad)" />

            {/* Broad Shoulders and Arms */}
            {/* Left Arm (Thicker) */}
            <path
              d="M 52 64 Q 32 95 38 135 Q 42 145 50 145 Q 56 145 54 130 Q 48 95 62 70 Z"
              fill="url(#heavyGrad)"
            />
            {/* Right Arm (Thicker) */}
            <path
              d="M 108 64 Q 128 95 122 135 Q 118 145 110 145 Q 104 145 106 130 Q 112 95 98 70 Z"
              fill="url(#heavyGrad)"
            />

            {/* Main Upper Torso */}
            <path
              d="M 50 64 Q 80 60 110 64 Q 120 95 118 120 Q 80 125 42 120 Q 40 95 50 64 Z"
              fill="url(#heavyGrad)"
            />

            {/* Animated Big Stomach / Abdomen with dynamic breathing pulse */}
            <g className="animate-[pulse_2.2s_ease-in-out_infinite]">
              {/* Prominent protruding belly curve */}
              <ellipse
                cx="80"
                cy="126"
                rx="38"
                ry="30"
                fill="url(#heavyGrad)"
              />
              {/* Internal fat oxidation glow circle */}
              <ellipse
                cx="80"
                cy="128"
                rx="28"
                ry="22"
                fill="url(#stomachGlow)"
              />
              {/* Waistline contour line */}
              <path
                d="M 46 128 Q 80 155 114 128"
                stroke="#FFE082"
                strokeWidth="2.5"
                fill="none"
                opacity="0.8"
                strokeDasharray="4 2"
              />
            </g>

            {/* Heavy Thighs & Legs */}
            {/* Left Leg */}
            <path
              d="M 50 148 Q 50 180 54 204 Q 56 208 66 208 Q 72 208 72 200 Q 70 175 70 148 Z"
              fill="url(#heavyGrad)"
            />
            {/* Right Leg */}
            <path
              d="M 90 148 Q 90 175 88 200 Q 88 208 94 208 Q 104 208 106 204 Q 110 180 110 148 Z"
              fill="url(#heavyGrad)"
            />
          </svg>

          {/* Floating animated energy icon */}
          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-accent-orange/20 border border-accent-orange/40 flex items-center justify-center text-accent-orange animate-bounce">
            <Flame className="w-4 h-4 fill-accent-orange" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-lg font-black uppercase text-white group-hover:text-accent-orange transition-colors">
            Excess Weight / Big Stomach
          </h4>
          <p className="text-xs text-accent-orange font-bold">Endomorph / Heavier Build</p>
          <p className="text-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            High visceral midsection fat. Needs joint-friendly high-volume calorie burning &amp; metabolic jumpstarts.
          </p>
        </div>
      </div>

      {/* 2. Medium Sized Person */}
      <div
        onClick={() => onSelect('medium')}
        className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
          selectedType === 'medium'
            ? 'bg-surface border-neon-lime shadow-card glow-lime-subtle ring-2 ring-neon-lime/40'
            : 'bg-surface/60 border-surface-border hover:border-zinc-500 hover:bg-surface'
        }`}
      >
        {selectedType === 'medium' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-neon-lime/20 text-neon-lime border border-neon-lime/30">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Medium / Athletic Sized Person */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            <defs>
              <linearGradient id="mediumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CCFF00" />
                <stop offset="100%" stopColor="#66AA00" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="42" ry="7" fill="#161922" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="36" r="16" fill="url(#mediumGrad)" />

            {/* Neck */}
            <rect x="74" y="50" width="12" height="12" rx="3" fill="url(#mediumGrad)" />

            {/* V-Taper Athletic Shoulders & Chest */}
            <path
              d="M 44 64 Q 80 58 116 64 L 106 112 Q 80 116 54 112 Z"
              fill="url(#mediumGrad)"
              className="animate-[pulse_3s_ease-in-out_infinite]"
            />

            {/* Chest definition lines */}
            <path d="M 64 78 Q 80 84 96 78" stroke="#161922" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 80 72 L 80 102" stroke="#161922" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Left Arm (Athletic definition) */}
            <path
              d="M 46 64 Q 28 92 34 130 Q 38 140 44 140 Q 50 140 48 126 Q 44 96 54 72 Z"
              fill="url(#mediumGrad)"
            />
            {/* Right Arm (Athletic definition) */}
            <path
              d="M 114 64 Q 132 92 126 130 Q 122 140 116 140 Q 110 140 112 126 Q 116 96 106 72 Z"
              fill="url(#mediumGrad)"
            />

            {/* Tapered Waist & Core (Moderate abdomen) */}
            <path
              d="M 55 110 Q 80 114 105 110 L 100 144 Q 80 148 60 144 Z"
              fill="url(#mediumGrad)"
            />
            {/* Abdominal outline lines */}
            <line x1="72" y1="122" x2="88" y2="122" stroke="#161922" strokeWidth="1.5" opacity="0.5" />
            <line x1="74" y1="134" x2="86" y2="134" stroke="#161922" strokeWidth="1.5" opacity="0.5" />

            {/* Athletic Legs */}
            {/* Left Leg */}
            <path
              d="M 60 144 Q 58 175 60 204 Q 62 208 70 208 Q 76 208 76 200 Q 74 175 74 144 Z"
              fill="url(#mediumGrad)"
            />
            {/* Right Leg */}
            <path
              d="M 86 144 Q 86 175 84 200 Q 84 208 90 208 Q 98 208 100 204 Q 102 175 100 144 Z"
              fill="url(#mediumGrad)"
            />
          </svg>

          {/* Floating animated icon */}
          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-neon-lime/20 border border-neon-lime/40 flex items-center justify-center text-neon-lime animate-pulse">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-lg font-black uppercase text-white group-hover:text-neon-lime transition-colors">
            Medium / Average Build
          </h4>
          <p className="text-xs text-neon-lime font-bold">Mesomorph / Balanced Frame</p>
          <p className="text-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            Balanced proportions with moderate body fat. Primed for body recomposition, muscle hardening &amp; 6-pack definition.
          </p>
        </div>
      </div>

      {/* 3. Slim / Lean Person */}
      <div
        onClick={() => onSelect('slim')}
        className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
          selectedType === 'slim'
            ? 'bg-surface border-accent-cyan shadow-card glow-cyan ring-2 ring-accent-cyan/40'
            : 'bg-surface/60 border-surface-border hover:border-zinc-500 hover:bg-surface'
        }`}
      >
        {selectedType === 'slim' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Slim / Ectomorph Frame */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <defs>
              <linearGradient id="slimGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#0077AA" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="36" ry="6" fill="#161922" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="34" r="14" fill="url(#slimGrad)" />

            {/* Long Lean Neck */}
            <rect x="76" y="47" width="8" height="14" rx="2" fill="url(#slimGrad)" />

            {/* Lean Torso */}
            <path
              d="M 52 62 Q 80 58 108 62 L 98 114 Q 80 116 62 114 Z"
              fill="url(#slimGrad)"
              className="animate-[pulse_1.8s_ease-in-out_infinite]"
            />

            {/* Lean Arms */}
            {/* Left Arm */}
            <path
              d="M 52 62 Q 38 90 42 128 Q 44 135 48 135 Q 52 135 52 124 Q 48 94 58 68 Z"
              fill="url(#slimGrad)"
            />
            {/* Right Arm */}
            <path
              d="M 108 62 Q 122 90 118 128 Q 116 135 112 135 Q 108 135 108 124 Q 112 94 102 68 Z"
              fill="url(#slimGrad)"
            />

            {/* Narrow Waist / Flat Stomach */}
            <path
              d="M 64 114 Q 80 116 96 114 L 92 146 Q 80 148 68 146 Z"
              fill="url(#slimGrad)"
            />

            {/* Lean Long Legs */}
            {/* Left Leg */}
            <path
              d="M 68 146 Q 66 175 68 205 Q 69 208 75 208 Q 80 208 80 200 Q 78 175 78 146 Z"
              fill="url(#slimGrad)"
            />
            {/* Right Leg */}
            <path
              d="M 82 146 Q 82 175 80 200 Q 80 208 85 208 Q 91 208 92 205 Q 94 175 92 146 Z"
              fill="url(#slimGrad)"
            />
          </svg>

          {/* Floating animated icon */}
          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan animate-bounce">
            <Zap className="w-4 h-4 fill-accent-cyan" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-lg font-black uppercase text-white group-hover:text-accent-cyan transition-colors">
            Slim / Lean Build
          </h4>
          <p className="text-xs text-accent-cyan font-bold">Ectomorph / Fast Metabolism</p>
          <p className="text-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            Naturally lean frame with high metabolism. Focused on progressive mechanical tension, mass building, and surplus fueling.
          </p>
        </div>
      </div>

    </div>
  );
}
