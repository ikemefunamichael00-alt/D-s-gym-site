'use client';

import React, { useState } from 'react';
import { Dumbbell, Activity, Flame, User, LogOut, Menu, X, Bell } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  activeTab: 'home' | 'dashboard' | 'calculator';
  onNavigate: (tab: 'home' | 'dashboard' | 'calculator') => void;
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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-surface-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-neon-lime flex items-center justify-center text-background font-black shadow-neon transition-transform group-hover:scale-105">
              <Dumbbell className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block uppercase">
                D&apos;s <span className="text-neon-lime">GYM</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block -mt-1">
                Elite Health & Fitness
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-surface-subtle/80 p-1.5 rounded-full border border-surface-border">
            <button
              onClick={() => onNavigate('home')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-neon-lime text-background font-bold shadow-neon'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-neon-lime text-background font-bold shadow-neon'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Activity className="w-4 h-4" />
              BMI Advisor
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'bg-neon-lime text-background font-bold shadow-neon'
                  : 'text-zinc-300 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Flame className="w-4 h-4 text-accent-orange" />
              Weight Tracker
            </button>
          </div>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface border border-surface-border cursor-pointer hover:border-zinc-500 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-neon-lime/20 border border-neon-lime/40 flex items-center justify-center text-neon-lime text-xs font-bold">
                    {userName.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[120px] truncate">{userName}</span>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 rounded-full text-zinc-400 hover:text-rose-400 hover:bg-surface-subtle transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-semibold text-zinc-300 hover:text-white px-4 py-2 rounded-lg hover:bg-surface-subtle transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-sm font-bold bg-neon-lime text-background hover:bg-neon-limeHover px-5 py-2.5 rounded-xl shadow-neon transition-all transform hover:-translate-y-0.5"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface border border-surface-border text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-surface px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${
              activeTab === 'home' ? 'bg-neon-lime text-background' : 'text-zinc-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => { onNavigate('calculator'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              activeTab === 'calculator' ? 'bg-neon-lime text-background' : 'text-zinc-300'
            }`}
          >
            <Activity className="w-4 h-4" />
            BMI Advisor & Calculator
          </button>
          <button
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'bg-neon-lime text-background' : 'text-zinc-300'
            }`}
          >
            <Flame className="w-4 h-4 text-accent-orange" />
            Member Weight Tracker
          </button>
          <div className="pt-2 border-t border-surface-border">
            {isLoggedIn ? (
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl text-rose-400 font-semibold flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out ({userName})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-center font-bold bg-surface-subtle text-white border border-surface-border"
                >
                  Log In
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-center font-bold bg-neon-lime text-background shadow-neon"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
