"use client";

import React from "react";
import Link from "next/link";
import { initialBooks } from "@/data/books";
import { ExternalLink } from "lucide-react";

export default function BooksPage() {
  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-20 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">04 · Written Works</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee]">
          Published Literature
        </h1>
        <p className="text-sm sm:text-base text-[#9e978e] leading-relaxed font-sans">
          Evangelist Tolucci&apos;s book for young believers navigating faith,
          success, and influence without compromising their allegiance to
          Christ.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 max-w-md gap-10 border-t border-white/[0.08] pt-12">
        {initialBooks.map((book) => (
          <div
            key={book.id}
            className="group bg-[#151312] border border-white/[0.08] p-8 flex flex-col justify-between hover:border-[#c8a97e]/40 transition-all duration-300"
          >
            <div className="space-y-6">
              {/* Cover */}
              <div className="aspect-[3/4] overflow-hidden bg-[#1c1917] relative shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 text-[10px] text-[#c8a97e] font-mono">
                  {book.publishedYear}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e]">
                  By {book.author}
                </span>
                <h3 className="font-serif text-2xl text-[#f7f4ee] group-hover:text-[#c8a97e] transition-colors leading-snug font-light">
                  {book.title}
                </h3>
                <p className="text-xs text-[#9e978e] italic font-serif line-clamp-1">
                  {book.subtitle}
                </p>
              </div>

              <p className="text-xs text-[#d6cec3]/80 line-clamp-3 leading-relaxed font-sans">
                {book.description}
              </p>

              {/* Central themes */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {book.centralThemes.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase tracking-wider text-[#9e978e] px-2 py-0.5 border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {book.purchaseLinks?.map((purchaseLink) => (
                  <a
                    key={purchaseLink.label}
                    href={purchaseLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-2 text-[10px] uppercase tracking-wider text-[#f7f4ee] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-colors"
                  >
                    {purchaseLink.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
              <Link
                href={`/books/${book.slug}`}
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-[#c8a97e] hover:text-[#dec49d] transition-colors"
              >
                Book Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
