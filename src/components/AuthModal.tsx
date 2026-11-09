'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, Scale, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (userData: { email: string; name: string; height: number; weight: number; targetWeight: number }) => void;
}

export default function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(84);
  const [targetWeightKg, setTargetWeightKg] = useState(75);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabase = createClient();

    // If Supabase is connected and ready
    if (supabase && isSupabaseConfigured()) {
      try {
        if (mode === 'signup') {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                height_cm: heightCm,
                target_weight_kg: targetWeightKg,
              },
            },
          });
          if (error) throw error;
          onSuccess({
            email: data.user?.email || email,
            name: fullName || 'Gym Member',
            height: heightCm,
            weight: weightKg,
            targetWeight: targetWeightKg,
          });
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          onSuccess({
            email: data.user?.email || email,
            name: data.user?.user_metadata?.full_name || 'Gym Member',
            height: Number(data.user?.user_metadata?.height_cm) || 178,
            weight: 82.3,
            targetWeight: Number(data.user?.user_metadata?.target_weight_kg) || 75,
          });
        }
        onClose();
      } catch (err: any) {
        setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    } else {
      // Offline / Quick Demo Mode fallback
      setTimeout(() => {
        onSuccess({
          email: email || 'demo.athlete@dsgym.com',
          name: fullName || (mode === 'signup' ? 'New Athlete' : 'Alex Vance'),
          height: heightCm,
          weight: weightKg,
          targetWeight: targetWeightKg,
        });
        setLoading(false);
        onClose();
      }, 500);
    }
  };

  const handleDemoLogin = () => {
    onSuccess({
      email: 'alex.fitness@dsgym.com',
      name: 'Alex Vance',
      height: 178,
      weight: 82.3,
      targetWeight: 75.0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface border border-surface-border rounded-3xl p-6 sm:p-8 shadow-card overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-neon-lime/10 blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white bg-surface-subtle border border-surface-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-neon-lime/10 border border-neon-lime/20 flex items-center justify-center text-neon-lime mx-auto mb-3 glow-lime-subtle">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black uppercase text-white tracking-tight">
            {mode === 'signup' ? 'Create Member Account' : 'Welcome Back, Athlete'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {mode === 'signup'
              ? 'Set your initial metrics to start tracking weight loss progress'
              : 'Log in with your Supabase credentials to access your dashboard'}
          </p>
        </div>

        {/* Demo Mode Quick Access Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-surface-subtle/70 border border-neon-lime/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <Zap className="w-4 h-4 text-neon-lime" />
            <span>Want to test the member dashboard instantly?</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 rounded-lg bg-neon-lime/15 border border-neon-lime/30 text-neon-lime text-xs font-bold hover:bg-neon-lime hover:text-background transition-all"
          >
            Instant Demo
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex p-1 bg-surface-subtle rounded-xl border border-surface-border mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
              mode === 'login' ? 'bg-neon-lime text-background shadow-neon' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
              mode === 'signup' ? 'bg-neon-lime text-background shadow-neon' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="athlete@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime transition-colors"
              />
            </div>
          </div>

          {/* Extra fields for Sign Up (Height, Weight, Target Weight) */}
          {mode === 'signup' && (
            <div className="pt-2 border-t border-surface-border space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neon-lime block">
                Physical Metrics & Goals
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min={120}
                    max={230}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    min={35}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Goal (kg)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    min={35}
                    max={250}
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-xl text-white text-sm focus:outline-none focus:border-neon-lime"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl font-black uppercase tracking-wider bg-neon-lime text-background hover:bg-neon-limeHover shadow-neon transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : mode === 'signup' ? 'Complete Registration' : 'Sign In To Dashboard'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secured with Supabase Row Level Security</span>
        </div>

      </div>
    </div>
  );
}
