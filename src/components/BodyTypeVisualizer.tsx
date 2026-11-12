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
        className={`relative p-6 rounded-token-xs border-2 cursor-pointer transition-all duration-fast flex flex-col items-center text-center group ${
          selectedType === 'heavy'
            ? 'bg-surface-card border-brand-coral shadow-coral ring-1 ring-brand-coral/40'
            : 'bg-surface-subtle/60 border-surface-border hover:border-zinc-500 hover:bg-surface-subtle'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect('heavy'); }}
        aria-pressed={selectedType === 'heavy'}
        aria-label="Select Excess Weight / Big Stomach physique"
      >
        {selectedType === 'heavy' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-token-sm text-[10px] font-black uppercase bg-brand-coral/20 text-brand-coral border border-brand-coral/40">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Excess Weight & Big Stomach */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,107,107,0.35)]"
          >
            <defs>
              <linearGradient id="heavyCoralGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#C92A2A" />
              </linearGradient>
              <radialGradient id="stomachCoralGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFA8A8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="48" ry="8" fill="#14171f" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="38" r="18" fill="url(#heavyCoralGrad)" />
            {/* Double chin / heavy jaw accent */}
            <ellipse cx="80" cy="50" rx="14" ry="7" fill="#A61E1E" opacity="0.7" />

            {/* Neck */}
            <rect x="71" y="52" width="18" height="12" rx="4" fill="url(#heavyCoralGrad)" />

            {/* Broad Shoulders and Arms */}
            <path
              d="M 52 64 Q 32 95 38 135 Q 42 145 50 145 Q 56 145 54 130 Q 48 95 62 70 Z"
              fill="url(#heavyCoralGrad)"
            />
            <path
              d="M 108 64 Q 128 95 122 135 Q 118 145 110 145 Q 104 145 106 130 Q 112 95 98 70 Z"
              fill="url(#heavyCoralGrad)"
            />

            {/* Main Upper Torso */}
            <path
              d="M 50 64 Q 80 60 110 64 Q 120 95 118 120 Q 80 125 42 120 Q 40 95 50 64 Z"
              fill="url(#heavyCoralGrad)"
            />

            {/* Animated Big Stomach / Abdomen with dynamic breathing pulse */}
            <g className="animate-[pulse_2.2s_ease-in-out_infinite]">
              <ellipse
                cx="80"
                cy="126"
                rx="38"
                ry="30"
                fill="url(#heavyCoralGrad)"
              />
              <ellipse
                cx="80"
                cy="128"
                rx="28"
                ry="22"
                fill="url(#stomachCoralGlow)"
              />
              <path
                d="M 46 128 Q 80 155 114 128"
                stroke="#FFE3E3"
                strokeWidth="2.5"
                fill="none"
                opacity="0.85"
                strokeDasharray="4 2"
              />
            </g>

            {/* Heavy Legs */}
            <path
              d="M 50 148 Q 50 180 54 204 Q 56 208 66 208 Q 72 208 72 200 Q 70 175 70 148 Z"
              fill="url(#heavyCoralGrad)"
            />
            <path
              d="M 90 148 Q 90 175 88 200 Q 88 208 94 208 Q 104 208 106 204 Q 110 180 110 148 Z"
              fill="url(#heavyCoralGrad)"
            />
          </svg>

          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-brand-coral/20 border border-brand-coral/40 flex items-center justify-center text-brand-coral animate-bounce">
            <Flame className="w-4 h-4 fill-brand-coral" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-token-md font-black uppercase text-white group-hover:text-brand-coral transition-colors duration-instant">
            Excess Weight &amp; Big Stomach
          </h4>
          <p className="text-token-xs text-brand-coral font-bold">Endomorph / Visceral Midsection Fat</p>
          <p className="text-token-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            High abdominal fat accumulation. Programmed for joint-safe, high-caloric metabolic depletion to burn belly fat.
          </p>
        </div>
      </div>

      {/* 2. Medium Sized Person */}
      <div
        onClick={() => onSelect('medium')}
        className={`relative p-6 rounded-token-xs border-2 cursor-pointer transition-all duration-fast flex flex-col items-center text-center group ${
          selectedType === 'medium'
            ? 'bg-surface-card border-brand-coral shadow-coral ring-1 ring-brand-coral/40'
            : 'bg-surface-subtle/60 border-surface-border hover:border-zinc-500 hover:bg-surface-subtle'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect('medium'); }}
        aria-pressed={selectedType === 'medium'}
        aria-label="Select Medium / Average Build physique"
      >
        {selectedType === 'medium' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-token-sm text-[10px] font-black uppercase bg-brand-coral/20 text-brand-coral border border-brand-coral/40">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Medium / Athletic Sized Person */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,146,43,0.35)]"
          >
            <defs>
              <linearGradient id="mediumOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFA94D" />
                <stop offset="100%" stopColor="#E8590C" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="42" ry="7" fill="#14171f" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="36" r="16" fill="url(#mediumOrangeGrad)" />

            {/* Neck */}
            <rect x="74" y="50" width="12" height="12" rx="3" fill="url(#mediumOrangeGrad)" />

            {/* V-Taper Athletic Shoulders & Chest */}
            <path
              d="M 44 64 Q 80 58 116 64 L 106 112 Q 80 116 54 112 Z"
              fill="url(#mediumOrangeGrad)"
              className="animate-[pulse_2.8s_ease-in-out_infinite]"
            />

            {/* Chest definition lines */}
            <path d="M 64 78 Q 80 84 96 78" stroke="#14171f" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 80 72 L 80 102" stroke="#14171f" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Left Arm */}
            <path
              d="M 46 64 Q 28 92 34 130 Q 38 140 44 140 Q 50 140 48 126 Q 44 96 54 72 Z"
              fill="url(#mediumOrangeGrad)"
            />
            {/* Right Arm */}
            <path
              d="M 114 64 Q 132 92 126 130 Q 122 140 116 140 Q 110 140 112 126 Q 116 96 106 72 Z"
              fill="url(#mediumOrangeGrad)"
            />

            {/* Tapered Waist & Core */}
            <path
              d="M 55 110 Q 80 114 105 110 L 100 144 Q 80 148 60 144 Z"
              fill="url(#mediumOrangeGrad)"
            />
            <line x1="72" y1="122" x2="88" y2="122" stroke="#14171f" strokeWidth="1.5" opacity="0.5" />
            <line x1="74" y1="134" x2="86" y2="134" stroke="#14171f" strokeWidth="1.5" opacity="0.5" />

            {/* Athletic Legs */}
            <path
              d="M 60 144 Q 58 175 60 204 Q 62 208 70 208 Q 76 208 76 200 Q 74 175 74 144 Z"
              fill="url(#mediumOrangeGrad)"
            />
            <path
              d="M 86 144 Q 86 175 84 200 Q 84 208 90 208 Q 98 208 100 204 Q 102 175 100 144 Z"
              fill="url(#mediumOrangeGrad)"
            />
          </svg>

          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-accent-orange/20 border border-accent-orange/40 flex items-center justify-center text-accent-orange animate-pulse">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-token-md font-black uppercase text-white group-hover:text-brand-coral transition-colors duration-instant">
            Medium / Athletic Build
          </h4>
          <p className="text-token-xs text-accent-orange font-bold">Mesomorph / Balanced Proportions</p>
          <p className="text-token-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            Balanced frame with moderate body fat. Primed for body recomposition, muscle hardening &amp; 6-pack sculpting.
          </p>
        </div>
      </div>

      {/* 3. Slim / Lean Person */}
      <div
        onClick={() => onSelect('slim')}
        className={`relative p-6 rounded-token-xs border-2 cursor-pointer transition-all duration-fast flex flex-col items-center text-center group ${
          selectedType === 'slim'
            ? 'bg-surface-card border-brand-coral shadow-coral ring-1 ring-brand-coral/40'
            : 'bg-surface-subtle/60 border-surface-border hover:border-zinc-500 hover:bg-surface-subtle'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect('slim'); }}
        aria-pressed={selectedType === 'slim'}
        aria-label="Select Slim / Lean Frame physique"
      >
        {selectedType === 'slim' && (
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-token-sm text-[10px] font-black uppercase bg-brand-coral/20 text-brand-coral border border-brand-coral/40">
            Selected
          </span>
        )}

        {/* Animated SVG Figure: Slim / Ectomorph Frame */}
        <div className="w-44 h-56 relative flex items-center justify-center my-2">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.35)]"
          >
            <defs>
              <linearGradient id="slimCyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#0077AA" />
              </linearGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="80" cy="208" rx="36" ry="6" fill="#14171f" opacity="0.8" />

            {/* Head */}
            <circle cx="80" cy="34" r="14" fill="url(#slimCyanGrad)" />

            {/* Long Lean Neck */}
            <rect x="76" y="47" width="8" height="14" rx="2" fill="url(#slimCyanGrad)" />

            {/* Lean Torso */}
            <path
              d="M 52 62 Q 80 58 108 62 L 98 114 Q 80 116 62 114 Z"
              fill="url(#slimCyanGrad)"
              className="animate-[pulse_1.8s_ease-in-out_infinite]"
            />

            {/* Lean Arms */}
            <path
              d="M 52 62 Q 38 90 42 128 Q 44 135 48 135 Q 52 135 52 124 Q 48 94 58 68 Z"
              fill="url(#slimCyanGrad)"
            />
            <path
              d="M 108 62 Q 122 90 118 128 Q 116 135 112 135 Q 108 135 108 124 Q 112 94 102 68 Z"
              fill="url(#slimCyanGrad)"
            />

            {/* Narrow Waist / Flat Stomach */}
            <path
              d="M 64 114 Q 80 116 96 114 L 92 146 Q 80 148 68 146 Z"
              fill="url(#slimCyanGrad)"
            />

            {/* Lean Long Legs */}
            <path
              d="M 68 146 Q 66 175 68 205 Q 69 208 75 208 Q 80 208 80 200 Q 78 175 78 146 Z"
              fill="url(#slimCyanGrad)"
            />
            <path
              d="M 82 146 Q 82 175 80 200 Q 80 208 85 208 Q 91 208 92 205 Q 94 175 92 146 Z"
              fill="url(#slimCyanGrad)"
            />
          </svg>

          <div className="absolute bottom-6 right-6 w-7 h-7 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan animate-bounce">
            <Zap className="w-4 h-4 fill-accent-cyan" />
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h4 className="text-token-md font-black uppercase text-white group-hover:text-brand-coral transition-colors duration-instant">
            Slim / Lean Frame
          </h4>
          <p className="text-token-xs text-accent-cyan font-bold">Ectomorph / Fast Metabolism</p>
          <p className="text-token-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">
            Naturally fast metabolism. Focused on progressive mechanical tension, compound hypertrophy, and clean mass building.
          </p>
        </div>
      </div>

    </div>
  );
}
