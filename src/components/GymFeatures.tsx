'use client';

import React from 'react';
import { Dumbbell, Users, Clock, Award, Check, Sparkles, Globe, MapPin, Zap, ShieldCheck } from 'lucide-react';

interface GymFeaturesProps {
  onJoinClick: () => void;
}

export default function GymFeatures({ onJoinClick }: GymFeaturesProps) {
  const partnerPerks = [
    { title: '2,500+ Partner Gym Locations', desc: 'Work out near home, office, or while traveling with zero guest pass hassles.', icon: Globe },
    { title: 'Any Gym Floor & Studio Class', desc: 'From heavy Olympic powerlifting clubs to boutique HIIT and spin studios.', icon: Dumbbell },
    { title: 'Digital Biometric Tracking', desc: 'WHO BMI tracking, kilogram deficit guidance, and daily habit streaks built-in.', icon: Zap },
    { title: 'No Contracts, Total Freedom', desc: 'Pause, upgrade, or cancel your universal membership anytime in 1 click.', icon: ShieldCheck },
  ];

  const tiers = [
    {
      name: 'anygym City Pass',
      price: '$49',
      period: '/month',
      description: 'Full access to all certified partner gyms within your metropolitan area.',
      features: [
        'All City Partner Gyms & Weight Rooms',
        '30-Day Transformation Workout Planner',
        'WHO Clinical BMI & Weight Deficit Suite',
        'Daily Check-in Habits & Streak Rewards',
      ],
      highlight: false,
    },
    {
      name: 'anygym Universal National',
      price: '$79',
      period: '/month',
      description: 'Our flagship universal membership. Train at any partner gym across the country.',
      features: [
        'Nationwide Universal Gym Access (2,500+ clubs)',
        'Unlimited Boutique Classes (HIIT, Spin, Yoga)',
        'Monthly 1-on-1 Nutrition Strategy Check-in',
        'Custom 30-Day Body Type Workout Plans',
        '2 Free Guest Passes Every Month',
      ],
      highlight: true,
    },
    {
      name: 'anygym Black All-Access',
      price: '$129',
      period: '/month',
      description: 'The ultimate luxury fitness pass with recovery spas and dedicated coaching.',
      features: [
        'Global Partner Gym Network Access',
        'Weekly 1-on-1 Personal Training Session',
        'Full Recovery Spa Access (Cryo, Cold Plunge, Sauna)',
        'Personalized Macro Meal Prep Strategy',
        'VIP Priority Class Booking',
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-surface-base relative border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: How Universal Gym Membership Works */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-coral text-token-xs font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4 text-brand-coral" />
              <span>Universal Gym Network</span>
            </div>
            <h2 className="text-3xl sm:text-token-2xl font-black text-white uppercase tracking-tight leading-tight">
              One Universal Membership. <br />
              <span className="text-brand-coral">Thousands of Doors.</span>
            </h2>
            <p className="text-zinc-400 text-token-sm leading-relaxed">
              Why lock yourself into one local gym? With anygym, one monthly subscription gives you instant barcode access to top-rated gym floors, Olympic barbell clubs, and boutique fitness studios nationwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {partnerPerks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div key={i} className="p-4 rounded-token-xs bg-surface-card border border-surface-border space-y-1.5">
                    <div className="flex items-center gap-2 text-brand-coral">
                      <Icon className="w-4 h-4" />
                      <span className="font-bold text-white text-token-xs">{perk.title}</span>
                    </div>
                    <p className="text-zinc-400 text-[12px] leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics & Partner Showcase */}
          <div className="bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 shadow-card">
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div>
                <h3 className="text-token-md font-bold text-white uppercase">Universal Network Impact</h3>
                <p className="text-token-xs text-zinc-400">Real-time stats across certified partner gyms</p>
              </div>
              <span className="px-3 py-1 rounded-token-sm bg-brand-coral/15 text-brand-coral text-[11px] font-black uppercase border border-brand-coral/30">
                Live Stats
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border">
                <span className="text-token-xl font-black text-white block">2,500+</span>
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Certified Clubs</span>
              </div>
              <div className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border">
                <span className="text-token-xl font-black text-brand-coral block">98.4%</span>
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Member Check-in Rate</span>
              </div>
              <div className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border">
                <span className="text-token-xl font-black text-accent-cyan block">14,200+</span>
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Kilograms Shed</span>
              </div>
              <div className="p-4 rounded-token-xs bg-surface-subtle border border-surface-border">
                <span className="text-token-xl font-black text-emerald-400 block">30 Days</span>
                <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Proven Transformation</span>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="text-token-xs text-zinc-400">Ready to unlock all gym doors?</span>
              <button
                onClick={onJoinClick}
                className="px-4 py-2 rounded-token-xs text-token-xs font-bold bg-brand-coral text-white hover:bg-brand-coralHover transition-all duration-instant shadow-coral"
              >
                Join anygym
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Transparent Universal Memberships */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-brand-coral text-token-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Universal Access Plans</span>
            </div>
            <h2 className="text-3xl sm:text-token-2xl font-black text-white uppercase tracking-tight">
              Select Your Universal Pass
            </h2>
            <p className="text-zinc-400 text-token-xs">
              Every membership includes our digital 30-day physique plan, WHO BMI tracking, and daily accountability check-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-token-xs p-8 transition-all duration-fast flex flex-col justify-between ${
                  tier.highlight
                    ? 'bg-surface-card border-2 border-brand-coral shadow-coral ring-1 ring-brand-coral/40'
                    : 'bg-surface-card/80 border border-surface-border hover:border-zinc-500'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-token-sm bg-brand-coral text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    <span>Most Popular Pass</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-token-md font-bold text-white uppercase">{tier.name}</h3>
                    <p className="text-token-xs text-zinc-400 mt-1 min-h-[36px]">{tier.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-token-2xl font-black text-white">{tier.price}</span>
                      <span className="text-token-xs font-semibold text-zinc-400">{tier.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-surface-border mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-token-xs text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-brand-coral/15 border border-brand-coral/40 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-brand-coral stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onJoinClick}
                  className={`w-full py-3.5 rounded-token-xs font-bold text-token-xs uppercase tracking-wider transition-all duration-instant ${
                    tier.highlight
                      ? 'bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral'
                      : 'bg-surface-subtle text-white hover:bg-surface-hover border border-surface-border'
                  }`}
                >
                  Activate Pass
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
