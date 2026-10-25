'use client';

import React from 'react';
import { Book } from '@/types';
import { X, BookOpen, ExternalLink } from 'lucide-react';

interface BookPreviewModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookPreviewModal({ book, onClose }: BookPreviewModalProps) {
  if (!book || !book.sampleExcerpt) return null;

  const buyUrl =
    book.formats.paperback?.buyUrl ||
    book.formats.ebook?.buyUrl ||
    book.formats.hardcover?.buyUrl ||
    '#';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#0f0f16] border border-[#c5a880]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#faf8f5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#232332] bg-[#14141e]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#c5a880]" />
            <h3 id="preview-modal-title" className="text-base font-semibold text-[#faf8f5]">
              Sample Preview · {book.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9c978e] hover:text-[#faf8f5] rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm sm:text-base leading-relaxed text-[#dcd6cc] serif-heading">
          <div className="border-b border-[#232332] pb-4">
            <p className="text-xs uppercase tracking-widest text-[#c5a880] sans-body font-semibold mb-1">
              {book.subtitle}
            </p>
            <h2 className="text-2xl text-[#faf8f5]">{book.sampleExcerpt.chapterTitle}</h2>
          </div>

          <div className="space-y-4 pt-2">
            {book.sampleExcerpt.text.map((p, i) => (
              <p key={i} className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#c5a880] first-letter:float-left first-letter:mr-2">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#161622] border border-[#c5a880]/20 sans-body text-xs text-[#9c978e] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>To continue reading, purchase the full book:</span>
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c5a880] text-[#0a0a0d] font-semibold hover:bg-[#e0cca9] transition-colors"
            >
              Get Full Copy <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
