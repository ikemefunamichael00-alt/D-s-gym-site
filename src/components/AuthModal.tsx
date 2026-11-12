'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (userData: { email: string; name: string; height: number; weight: number; targetWeight: number }) => void;
}

export default function AuthModal({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(80);
  const [targetWeightKg, setTargetWeightKg] = useState(70);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Lock background body scroll and bind Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
    setSuccessNotice('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessNotice('');

    const supabase = createClient();

    if (!supabase || !isSupabaseConfigured()) {
      setErrorMsg('Supabase is not configured. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              height_cm: heightCm,
              starting_weight_kg: weightKg,
              weight_kg: weightKg,
              target_weight_kg: targetWeightKg,
            },
          },
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setSuccessNotice(
            `Account created! Please check your inbox at ${email} to verify, or sign in.`
          );
          setLoading(false);
          return;
        }

        onSuccess({
          email: data.user?.email || email,
          name: fullName || 'Gym Athlete',
          height: heightCm,
          weight: weightKg,
          targetWeight: targetWeightKg,
        });
        onClose();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        const userMeta = data.user?.user_metadata || {};
        onSuccess({
          email: data.user?.email || email,
          name: userMeta.full_name || 'Gym Athlete',
          height: Number(userMeta.height_cm) || 175,
          weight: Number(userMeta.weight_kg) || Number(userMeta.starting_weight_kg) || 80,
          targetWeight: Number(userMeta.target_weight_kg) || 70,
        });
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center min-h-screen"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-lg bg-surface-card border border-surface-border rounded-token-xs p-6 sm:p-8 shadow-card my-auto max-h-[92vh] overflow-y-auto overscroll-contain"
      >
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-coral/10 blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-token-xs text-zinc-400 hover:text-white bg-surface-subtle border border-surface-border transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 rounded-token-xs bg-brand-coral/15 border border-brand-coral/30 flex items-center justify-center text-brand-coral mx-auto mb-3 glow-coral-subtle">
            <Lock className="w-6 h-6" />
          </div>
          <h3 id="auth-modal-title" className="text-token-xl font-black uppercase text-white tracking-tight">
            {mode === 'signup' ? 'Join anygym Universal' : 'Welcome Back, Athlete'}
          </h3>
          <p className="text-token-xs text-zinc-400 mt-1">
            {mode === 'signup'
              ? 'Enter your baseline metrics to unlock your 30-day plan & weight tracker'
              : 'Sign in to access your universal gym passport and biometrics'}
          </p>
        </div>

        {/* Mode Switch Tabs (radius.sm=9999px) */}
        <div className="flex p-1 bg-surface-subtle rounded-token-sm border border-surface-border mb-6">
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-token-xs font-bold rounded-token-sm uppercase tracking-wider transition-all duration-instant ${
              mode === 'signup' ? 'bg-brand-coral text-white shadow-coral font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Register / Sign Up
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-token-xs font-bold rounded-token-sm uppercase tracking-wider transition-all duration-instant ${
              mode === 'login' ? 'bg-brand-coral text-white shadow-coral font-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3.5 rounded-token-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 text-token-xs font-medium flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Notice */}
        {successNotice && (
          <div className="mb-4 p-4 rounded-token-xs bg-brand-coral/10 border border-brand-coral/30 text-brand-coral text-token-xs font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div className="space-y-2">
              <p>{successNotice}</p>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="underline font-bold text-white hover:text-brand-coral block"
              >
                Switch to Sign In →
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label htmlFor="auth-fullname" className="block text-token-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="auth-fullname"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-token-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="auth-email"
                type="email"
                required
                placeholder="athlete@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-token-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Password {mode === 'signup' && <span className="text-[10px] text-zinc-500">(min 6 chars)</span>}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs focus:outline-none focus:border-brand-coral transition-colors"
              />
            </div>
          </div>

          {/* Physical Metrics for Sign Up */}
          {mode === 'signup' && (
            <div className="pt-3 border-t border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-brand-coral">
                  Baseline Metrics
                </span>
                <span className="text-[10px] text-zinc-400">Used for WHO BMI &amp; Goal Guidance</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="auth-height" className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Height (cm)
                  </label>
                  <input
                    id="auth-height"
                    type="number"
                    min={120}
                    max={230}
                    required
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs font-semibold focus:outline-none focus:border-brand-coral"
                  />
                </div>
                <div>
                  <label htmlFor="auth-weight" className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    id="auth-weight"
                    type="number"
                    step={0.1}
                    min={35}
                    max={250}
                    required
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs font-semibold focus:outline-none focus:border-brand-coral"
                  />
                </div>
                <div>
                  <label htmlFor="auth-target-weight" className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Goal (kg)
                  </label>
                  <input
                    id="auth-target-weight"
                    type="number"
                    step={0.1}
                    min={35}
                    max={250}
                    required
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-surface-subtle border border-surface-border rounded-token-xs text-white text-token-xs font-semibold focus:outline-none focus:border-brand-coral"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-4 rounded-token-xs font-black uppercase tracking-wider text-token-xs bg-brand-coral text-white hover:bg-brand-coralHover shadow-coral transition-all duration-instant flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>
              {loading ? 'Processing...' : mode === 'signup' ? 'Complete anygym Registration' : 'Sign In To Dashboard'}
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secured via Supabase Universal Authentication</span>
        </div>

      </div>
    </div>
  );
}
