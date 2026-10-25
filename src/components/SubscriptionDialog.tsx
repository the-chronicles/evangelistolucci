'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Mail } from 'lucide-react';

export default function SubscriptionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dailyDevotional, setDailyDevotional] = useState(true);
  const [ministryNewsletter, setMinistryNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem('tolucci_dialog_dismissed');
    const subscribed = localStorage.getItem('tolucci_subscribed');

    if (!dismissed && !subscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('tolucci_dialog_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!dailyDevotional && !ministryNewsletter) {
      setError('Please select at least one subscription option.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          preferences: {
            dailyDevotional,
            ministryNewsletter,
          },
          source: 'first_visit_modal',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Subscription failed. Please try again.');
      } else {
        setSuccess(true);
        setMessage(data.message || 'You have been successfully subscribed!');
        localStorage.setItem('tolucci_subscribed', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md bg-[#161413] border border-white/[0.1] shadow-2xl p-8 sm:p-10 text-[#f7f4ee]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#9e978e] hover:text-[#f7f4ee] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto border border-[#c8a97e] flex items-center justify-center text-[#c8a97e]">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#f7f4ee]">Welcome to the Community</h3>
            <p className="text-xs text-[#d6cec3] leading-relaxed max-w-xs mx-auto">
              {message}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="section-label">A Daily Moment with God</span>
              <h2 id="dialog-title" className="font-serif text-3xl font-light text-[#f7f4ee]">
                Make room for the Word.
              </h2>
              <p className="text-xs text-[#d6cec3]/80 leading-relaxed font-sans">
                Begin your day with Scripture, spiritual insight, and devotionals designed to strengthen your walk with God.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-950/50 border border-red-800 text-xs text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                  Your name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] focus:border-[#c8a97e] focus:outline-none text-xs text-[#f7f4ee] placeholder-[#6b635b]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                  Email address <span className="text-[#c8a97e]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] focus:border-[#c8a97e] focus:outline-none text-xs text-[#f7f4ee] placeholder-[#6b635b]"
                  />
                  <Mail className="w-3.5 h-3.5 text-[#9e978e] absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs group">
                  <input
                    type="checkbox"
                    checked={dailyDevotional}
                    onChange={(e) => setDailyDevotional(e.target.checked)}
                    className="mt-0.5 accent-[#c8a97e] cursor-pointer"
                  />
                  <span className="text-[#d6cec3] group-hover:text-[#f7f4ee] text-[11px] leading-tight">
                    <strong className="text-[#f7f4ee] block font-medium">Daily Devotionals</strong>
                    Receive daily Scripture readings and reflections.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs group">
                  <input
                    type="checkbox"
                    checked={ministryNewsletter}
                    onChange={(e) => setMinistryNewsletter(e.target.checked)}
                    className="mt-0.5 accent-[#c8a97e] cursor-pointer"
                  />
                  <span className="text-[#d6cec3] group-hover:text-[#f7f4ee] text-[11px] leading-tight">
                    <strong className="text-[#f7f4ee] block font-medium">Ministry Newsletter</strong>
                    Receive new sermons, book releases, and tour dates.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#dec49d] transition-all disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe for Free'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 text-center text-[11px] text-[#9e978e] hover:text-[#f7f4ee] underline underline-offset-4"
                >
                  Maybe later · Close
                </button>
              </div>

              <p className="text-[10px] text-center text-[#6b635b] pt-1">
                Unsubscribe anytime. Your details remain private.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
