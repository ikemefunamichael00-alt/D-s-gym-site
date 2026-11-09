'use client';

import React from 'react';
import { Dumbbell, Users, Clock, Award, Check, Sparkles } from 'lucide-react';

interface GymFeaturesProps {
  onJoinClick: () => void;
}

export default function GymFeatures({ onJoinClick }: GymFeaturesProps) {
  const classes = [
    { title: 'Iron Conditioning & HIIT', duration: '50 Min', intensity: 'Very High', coach: 'Coach Marcus', tag: 'Fat Loss Focus' },
    { title: 'Power & Olympic Lifting', duration: '60 Min', intensity: 'High', coach: 'Sarah Jenkins', tag: 'Strength' },
    { title: 'Core & Metabolic Circuit', duration: '45 Min', intensity: 'Medium', coach: 'Dave Miller', tag: 'Endurance' },
    { title: 'Athletic Recovery & Mobility', duration: '40 Min', intensity: 'Low', coach: 'Elena Rostova', tag: 'Flexibility' },
  ];

  const tiers = [
    {
      name: 'Standard Athlete',
      price: '$49',
      period: '/month',
      description: 'Ideal for consistent self-guided workouts & metric tracking.',
      features: ['24/7 Gym & Floor Access', 'Full Digital Weight Tracker & BMI Suite', 'Locker Room & Sauna', 'Daily Check-in Streaks'],
      highlight: false,
    },
    {
      name: 'Pro Performance',
      price: '$79',
      period: '/month',
      description: 'Our most popular membership for serious transformation.',
      features: [
        'All Standard Features',
        'Unlimited Studio Classes & HIIT',
        'Monthly 1-on-1 Nutrition Strategy',
        'Custom Daily Reminder Automation',
        'Priority Trainer Consultation',
      ],
      highlight: true,
    },
    {
      name: 'Elite Transformation',
      price: '$129',
      period: '/month',
      description: 'Full coaching, dedicated biometric testing, and tailored nutrition.',
      features: [
        'All Pro Features',
        'Weekly 1-on-1 Personal Training',
        'DEXA Body Scan & Biometrics',
        'Custom Meal Prep Planning',
        'Guest Passes (2 per month)',
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-background relative border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Facilities & Culture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-neon-lime text-xs font-bold uppercase tracking-wider">
              <Dumbbell className="w-4 h-4" />
              <span>World-Class Training Facility</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Built For Results. <br />
              <span className="text-neon-lime">Zero Distractions.</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              At D&apos;s Gym, science meets iron. We provide state-of-the-art calibrated plates, power racks, Eleiko barbells, and integrated weight tracking so you never guess your progress again.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-surface border border-surface-border">
                <span className="text-2xl font-black text-white block">24/7</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Access & Secure Entry</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-border">
                <span className="text-2xl font-black text-neon-lime block">15+</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Certified Coaches</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-border">
                <span className="text-2xl font-black text-accent-cyan block">10,000+</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Kilograms Shed</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-surface-border">
                <span className="text-2xl font-black text-accent-orange block">100%</span>
                <span className="text-xs text-zinc-400 font-semibold uppercase">Science-Based Methods</span>
              </div>
            </div>
          </div>

          {/* Training Schedule Preview */}
          <div className="bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 shadow-card">
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Today&apos;s Featured Classes</h3>
                <p className="text-xs text-zinc-400">Available to all active members</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-neon-lime/10 text-neon-lime text-xs font-bold border border-neon-lime/20">
                Live Schedule
              </span>
            </div>

            <div className="divide-y divide-surface-border">
              {classes.map((cls, i) => (
                <div key={i} className="py-4 flex items-center justify-between group hover:bg-surface-subtle/50 px-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm group-hover:text-neon-lime transition-colors">
                        {cls.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface-subtle text-accent-cyan border border-surface-border">
                        {cls.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {cls.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        {cls.coach}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-zinc-300 block">{cls.intensity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Membership Pricing */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-neon-lime text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Transparent Memberships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Choose Your Transformation Plan
            </h2>
            <p className="text-zinc-400 text-sm">
              All plans include complete access to our digital weight tracker, BMI guidance, and daily check-in habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 transition-all flex flex-col justify-between ${
                  tier.highlight
                    ? 'bg-surface border-2 border-neon-lime shadow-neon'
                    : 'bg-surface/70 border border-surface-border hover:border-zinc-500'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon-lime text-background text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-background" />
                    <span>Most Recommended</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white uppercase">{tier.name}</h3>
                    <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{tier.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-sm font-semibold text-zinc-400">{tier.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-surface-border mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-neon-lime stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onJoinClick}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                    tier.highlight
                      ? 'bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon'
                      : 'bg-surface-subtle text-white hover:bg-surface-hover border border-surface-border'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
