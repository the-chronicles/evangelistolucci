"use client";

import React, { use } from "react";
import Link from "next/link";
import { initialBooks } from "@/data/books";
import { initialSermons } from "@/data/sermons";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const book = initialBooks.find((b) => b.slug === resolvedParams.slug);

  if (!book) {
    notFound();
  }

  const relatedSermons = initialSermons.filter((s) =>
    book.relatedSermonSlugs?.includes(s.slug),
  );

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-16 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Back button */}
      <div className="border-b border-white/[0.08] pb-6">
        <Link
          href="/books"
          className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> All Books & Literature
        </Link>
      </div>

      {/* Main Book Spread */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Cover */}
        <div className="md:col-span-5 space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-[#181615] border border-white/[0.08] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details & Formats */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="section-label">
              By {book.author} · Published {book.publishedYear}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#f7f4ee] leading-tight">
              {book.title}
            </h1>
            <p className="font-serif text-lg text-[#c8a97e] italic">
              {book.subtitle}
            </p>
          </div>

          <p className="text-sm text-[#d6cec3]/90 leading-relaxed font-sans">
            {book.description}
          </p>

          {/* Purchase Links */}
          <div className="p-6 bg-[#161413] border border-white/[0.08] space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#f7f4ee] font-semibold block">
              Purchase the Book
            </span>
            <div className="flex flex-wrap gap-3">
              {book.purchaseLinks?.map((purchaseLink) => (
                <a
                  key={purchaseLink.label}
                  href={purchaseLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/20 text-[#f7f4ee] hover:border-[#c8a97e] text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  {purchaseLink.label}{" "}
                  <ExternalLink className="w-3.5 h-3.5 text-[#c8a97e]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience & Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/[0.08] pt-12">
        <div className="p-8 bg-[#141211] border border-white/[0.08] space-y-3">
          <span className="section-label">Target Audience</span>
          <h3 className="font-serif text-2xl text-[#f7f4ee]">
            Who This Book Is For
          </h3>
          <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed font-sans">
            {book.targetAudience}
          </p>
        </div>

        <div className="p-8 bg-[#141211] border border-white/[0.08] space-y-3">
          <span className="section-label">Spiritual Key Takeaways</span>
          <h3 className="font-serif text-2xl text-[#f7f4ee]">
            Core Revelations
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#d6cec3]/80 font-sans">
            {book.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] mt-1.5 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Teachings */}
      {relatedSermons.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-white/[0.08]">
          <span className="section-label">Related Messages</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedSermons.map((s) => (
              <Link
                key={s.id}
                href={`/sermons/${s.slug}`}
                className="p-5 bg-[#141211] border border-white/[0.08] hover:border-[#c8a97e] transition-colors flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#c8a97e]">
                    {s.topic}
                  </span>
                  <h4 className="font-serif text-lg text-[#f7f4ee] group-hover:text-[#c8a97e] line-clamp-1">
                    {s.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-[#c8a97e] shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
