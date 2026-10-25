"use client";

import React from "react";
import { devotionalProduct } from "@/data/devotionals";
import { ExternalLink } from "lucide-react";

export default function DevotionalArchivePage() {
  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-20 bg-[#0f0e0d] text-[#f7f4ee]">
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">03 · Daily Bread</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee]">
          Daily Devotional
        </h1>
        <p className="text-sm sm:text-base text-[#9e978e] leading-relaxed font-sans">
          A 30-day devotional and prayer guide for standing firm in faith,
          navigating influence, and advancing God&apos;s Kingdom.
        </p>
      </div>

      <div className="grid grid-cols-1 max-w-md gap-10 border-t border-white/[0.08] pt-12">
        <article className="group bg-[#151312] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#c8a97e]/40 transition-all duration-300">
          <div className="space-y-6">
            <div className="aspect-[3/4] overflow-hidden bg-[#1c1917] relative shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={devotionalProduct.coverImage}
                alt={`${devotionalProduct.title} devotional cover`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e]">
                30-Day Devotional · Prayer Guide
              </span>
              <h2 className="font-serif text-2xl text-[#f7f4ee] group-hover:text-[#c8a97e] transition-colors leading-snug font-light">
                {devotionalProduct.title}
              </h2>
              <p className="text-xs text-[#9e978e] italic font-serif">
                {devotionalProduct.subtitle}
              </p>
            </div>

            <div className="space-y-3 text-xs text-[#d6cec3]/80 leading-relaxed font-sans">
              {devotionalProduct.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] mt-8 space-y-3">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c8a97e]">
              Purchase the devotional
            </span>
            <div className="flex flex-wrap gap-2">
              {devotionalProduct.purchaseLinks.map((purchaseLink) => (
                <a
                  key={purchaseLink.label}
                  href={purchaseLink.url}
                  className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-2 text-[10px] uppercase tracking-wider text-[#f7f4ee] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-colors"
                >
                  {purchaseLink.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
