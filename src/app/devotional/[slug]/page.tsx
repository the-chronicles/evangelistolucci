'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { initialDevotionals } from '@/data/devotionals';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

export default function DevotionalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const devotional = initialDevotionals.find((d) => d.slug === resolvedParams.slug);

  const [copied, setCopied] = useState(false);

  if (!devotional) {
    notFound();
  }

  const currentIndex = initialDevotionals.findIndex((d) => d.slug === resolvedParams.slug);
  const prevDevotional = currentIndex < initialDevotionals.length - 1 ? initialDevotionals[currentIndex + 1] : null;
  const nextDevotional = currentIndex > 0 ? initialDevotionals[currentIndex - 1] : null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `*${devotional.title}* - Evangelist Tolucci\n\n"${devotional.excerpt}"\n\nRead full devotional: ${currentUrl}`
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${devotional.title}" by Evangelist Tolucci: ${currentUrl}`
  )}`;

  return (
    <article className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto space-y-16 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Top Navigation & Share Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <Link
          href="/devotional"
          className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> All Devotionals
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.12em] text-[#25D366] hover:underline inline-flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <button
            onClick={handleCopyLink}
            className="text-xs uppercase tracking-[0.12em] text-[#9e978e] hover:text-[#f7f4ee] inline-flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Share'}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-[#c8a97e] font-mono">
          <span>{devotional.date}</span>
          <span>·</span>
          <span>By {devotional.author}</span>
          <span>·</span>
          <span>{devotional.readingTimeMinutes} min read</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#f7f4ee] leading-tight">
          {devotional.title}
        </h1>
      </header>

      {/* Scripture of the Day */}
      <section className="p-8 sm:p-10 bg-[#141211] border-l-2 border-[#c8a97e] space-y-3">
        <span className="section-label">Scripture of the Day</span>
        <blockquote className="font-serif text-xl sm:text-2xl text-[#f7f4ee] italic leading-relaxed font-normal">
          &ldquo;{devotional.scriptureText}&rdquo;
        </blockquote>
        <div className="text-right text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#c8a97e]">
          — {devotional.scriptureReference}
        </div>
      </section>

      {/* Main Meditation Body Text */}
      <section className="space-y-6 text-base sm:text-lg text-[#d6cec3] leading-relaxed font-serif">
        {devotional.content.map((p, idx) => (
          <p
            key={idx}
            className={
              idx === 0
                ? 'first-letter:text-6xl first-letter:font-serif first-letter:text-[#c8a97e] first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                : ''
            }
          >
            {p}
          </p>
        ))}
      </section>

      {/* Reflection Questions */}
      {devotional.reflectionQuestions?.length > 0 && (
        <section className="p-8 bg-[#141211] border border-white/[0.08] space-y-4 font-sans">
          <span className="section-label">Practical Application</span>
          <ul className="space-y-3 text-xs sm:text-sm text-[#d6cec3]">
            {devotional.reflectionQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#c8a97e] font-mono">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Closing Prayer */}
      {devotional.prayer && (
        <section className="p-8 bg-[#161413] border border-white/[0.08] space-y-3">
          <span className="section-label">Prayer of Consecration</span>
          <p className="font-serif text-lg sm:text-xl italic text-[#f7f4ee] leading-relaxed">
            &ldquo;{devotional.prayer}&rdquo;
          </p>
        </section>
      )}

      {/* Prev / Next Devotional Navigation */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/[0.08]">
        {prevDevotional ? (
          <Link
            href={`/devotional/${prevDevotional.slug}`}
            className="p-6 bg-[#141211] border border-white/[0.08] hover:border-[#c8a97e]/40 transition-colors group block space-y-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e978e]">Previous Reading</span>
            <h4 className="font-serif text-lg text-[#f7f4ee] group-hover:text-[#c8a97e] line-clamp-1">
              {prevDevotional.title}
            </h4>
          </Link>
        ) : (
          <div />
        )}

        {nextDevotional ? (
          <Link
            href={`/devotional/${nextDevotional.slug}`}
            className="p-6 bg-[#141211] border border-white/[0.08] hover:border-[#c8a97e]/40 transition-colors group block text-right space-y-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e978e]">Next Reading</span>
            <h4 className="font-serif text-lg text-[#f7f4ee] group-hover:text-[#c8a97e] line-clamp-1">
              {nextDevotional.title}
            </h4>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
