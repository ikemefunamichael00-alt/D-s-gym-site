'use client';

import React, { useState } from 'react';
import { Dumbbell, Activity, Flame, LogOut, Menu, X, Calendar, Globe } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  activeTab: 'home' | 'dashboard' | 'calculator' | 'workout-plan';
  onNavigate: (tab: 'home' | 'dashboard' | 'calculator' | 'workout-plan') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  userName?: string;
}

export default function Navbar({
  isLoggedIn,
  activeTab,
  onNavigate,
  onOpenAuth,
  onLogout,
  userName = 'Member',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-surface-base/90 border-b border-surface-border transition-all duration-instant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand: anygym — Universal Gym Membership */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group focus-visible:ring-2 focus-visible:ring-brand-coral rounded-token-xs p-1"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigate('home'); }}
            role="button"
            aria-label="anygym home"
          >
            <div className="w-10 h-10 rounded-token-xs bg-brand-coral flex items-center justify-center text-white font-black shadow-coral transition-transform duration-instant group-hover:scale-105">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-token-lg font-black tracking-tight text-white uppercase leading-none">
                  any<span className="text-brand-coral">gym</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-brand-coral/20 text-brand-coral border border-brand-coral/40 tracking-wider">
                  Universal
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-zinc-400 block mt-0.5">
                Universal Gym Membership
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Pill bar token radius.sm=9999px) */}
          <div className="hidden md:flex items-center gap-1 bg-surface-card p-1.5 rounded-token-sm border border-surface-border">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-token-sm text-token-xs font-semibold transition-all duration-instant ${
                activeTab === 'home'
                  ? 'bg-brand-coral text-white font-bold shadow-coral'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className={`px-4 py-2 rounded-token-sm text-token-xs font-semibold transition-all duration-instant flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-brand-coral text-white font-bold shadow-coral'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Activity className="w-4 h-4" />
              BMI Advisor
            </button>
            <button
              onClick={() => onNavigate('workout-plan')}
              className={`px-4 py-2 rounded-token-sm text-token-xs font-semibold transition-all duration-instant flex items-center gap-1.5 ${
                activeTab === 'workout-plan'
                  ? 'bg-brand-coral text-white font-bold shadow-coral'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Calendar className="w-4 h-4 text-brand-coral" />
              30-Day Plan
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-4 py-2 rounded-token-sm text-token-xs font-semibold transition-all duration-instant flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-brand-coral text-white font-bold shadow-coral'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Flame className="w-4 h-4 text-accent-orange" />
              Weight Tracker
            </button>
          </div>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-token-sm bg-surface-card border border-surface-border cursor-pointer hover:border-zinc-500 transition-all duration-instant"
                >
                  <div className="w-7 h-7 rounded-token-sm bg-brand-coral/20 border border-brand-coral/40 flex items-center justify-center text-brand-coral text-xs font-bold">
                    {userName.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-token-xs font-medium text-white max-w-[120px] truncate">{userName}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-2 rounded-token-sm text-zinc-400 hover:text-rose-400 hover:bg-surface-subtle transition-all duration-instant"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-token-xs font-semibold text-zinc-300 hover:text-white px-4 py-2 rounded-token-xs hover:bg-surface-subtle transition-all duration-instant"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-token-xs font-bold bg-brand-coral text-white hover:bg-brand-coralHover px-5 py-2.5 rounded-token-xs shadow-coral transition-all duration-instant transform hover:-translate-y-0.5"
                >
                  Join anygym
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-token-xs bg-surface-card border border-surface-border text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-surface-card px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-token-xs text-token-xs font-semibold transition-colors ${
              activeTab === 'home' ? 'bg-brand-coral text-white font-bold' : 'text-zinc-300 hover:bg-surface-subtle'
            }`}
          >
            Overview &amp; Universal Access
          </button>
          <button
            onClick={() => { onNavigate('calculator'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-token-xs text-token-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'calculator' ? 'bg-brand-coral text-white font-bold' : 'text-zinc-300 hover:bg-surface-subtle'
            }`}
          >
            <Activity className="w-4 h-4" />
            BMI Advisor &amp; Weight Deficit
          </button>
          <button
            onClick={() => { onNavigate('workout-plan'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-token-xs text-token-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'workout-plan' ? 'bg-brand-coral text-white font-bold' : 'text-zinc-300 hover:bg-surface-subtle'
            }`}
          >
            <Calendar className="w-4 h-4 text-brand-coral" />
            30-Day Workout Plan
          </button>
          <button
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-token-xs text-token-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'dashboard' ? 'bg-brand-coral text-white font-bold' : 'text-zinc-300 hover:bg-surface-subtle'
            }`}
          >
            <Flame className="w-4 h-4 text-accent-orange" />
            Member Weight Tracker
          </button>
          <div className="pt-3 border-t border-surface-border">
            {isLoggedIn ? (
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-token-xs text-rose-400 font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out ({userName})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-token-xs text-center text-token-xs font-bold bg-surface-subtle text-white border border-surface-border"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-token-xs text-center text-token-xs font-bold bg-brand-coral text-white shadow-coral"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
