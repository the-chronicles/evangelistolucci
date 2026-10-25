"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { initialSermons } from "@/data/sermons";
import { notFound } from "next/navigation";
import { useAudioPlayer } from "@/components/AudioPlayerContext";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Share2,
  Check,
  Play,
  Volume2,
} from "lucide-react";

export default function SermonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const sermon = initialSermons.find((s) => s.slug === resolvedParams.slug);

  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [copied, setCopied] = useState(false);

  if (!sermon) {
    notFound();
  }

  const relatedSermons = initialSermons
    .filter(
      (s) =>
        s.slug !== sermon.slug &&
        (s.topic === sermon.topic || s.series === sermon.series),
    )
    .slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCurrentAudioPlaying = currentTrack?.id === sermon.id && isPlaying;
  const sermonAudioUrl = sermon.audioUrl;

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-12 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Back and Share */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <Link
          href="/sermons"
          className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> All Sermons
        </Link>
        <button
          onClick={handleCopyLink}
          className="text-xs uppercase tracking-[0.14em] text-[#9e978e] hover:text-[#f7f4ee] flex items-center gap-1.5"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          {copied ? "Link Copied" : "Share"}
        </button>
      </div>

      {/* 16:9 Cinema Embed */}
      <div className="aspect-video bg-black border border-white/[0.08] overflow-hidden shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${sermon.youtubeId}?rel=0&modestbranding=1`}
          title={sermon.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Main Info */}
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#9e978e]">
            <span className="text-[#c8a97e] uppercase tracking-wider font-semibold">
              {sermon.topic}
            </span>
            {sermon.series && <span>· Series: {sermon.series}</span>}
            <span>·</span>
            <span>{sermon.date}</span>
            <span>·</span>
            <span>{sermon.duration}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#f7f4ee] leading-tight">
            {sermon.title}
          </h1>
        </div>

        {/* Audio Listen & Download Strip */}
        {sermonAudioUrl && (
          <div className="p-6 bg-[#161413] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  playTrack({
                    id: sermon.id,
                    title: sermon.title,
                    artist: "Evangelist Tolucci",
                    albumTitle: sermon.series || "Prophetic Message",
                    coverArt: sermon.thumbnailUrl,
                    audioUrl: sermonAudioUrl,
                  })
                }
                className="w-10 h-10 rounded-full bg-[#c8a97e] text-[#0f0e0d] flex items-center justify-center hover:bg-[#dec49d] transition-transform"
              >
                {isCurrentAudioPlaying ? (
                  <Volume2 className="w-4 h-4 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <div>
                <h4 className="text-sm font-medium text-[#f7f4ee]">
                  {isCurrentAudioPlaying
                    ? "Streaming Audio Message"
                    : "Listen to Audio"}
                </h4>
                <p className="text-xs text-[#9e978e]">
                  Continuous playback while browsing the site
                </p>
              </div>
            </div>

            <a
              href={sermonAudioUrl}
              download
              className="px-4 py-2 border border-white/20 text-xs uppercase tracking-wider text-[#f7f4ee] hover:border-[#c8a97e] transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#c8a97e]" /> Download Audio
              (MP3)
            </a>
          </div>
        )}

        {/* Description & Scripture References */}
        <div className="space-y-4 pt-4 border-t border-white/[0.08]">
          <span className="section-label">Teaching Overview</span>
          <p className="text-sm sm:text-base text-[#d6cec3]/90 leading-relaxed font-sans">
            {sermon.description}
          </p>
          {sermon.scriptureReferences.length > 0 && (
            <div className="p-4 bg-[#141211] border-l-2 border-[#c8a97e] text-xs sm:text-sm text-[#c8a97e]">
              <strong>Scripture Texts:</strong>{" "}
              {sermon.scriptureReferences.join(" · ")}
            </div>
          )}
        </div>

        {/* Key Teaching Points */}
        {sermon.keyPoints && sermon.keyPoints.length > 0 && (
          <div className="bg-[#141211] border border-white/[0.08] p-8 space-y-4">
            <span className="section-label">Apostolic Outline</span>
            <ul className="space-y-3 text-xs sm:text-sm text-[#d6cec3]/90">
              {sermon.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Transcript Excerpt */}
        {sermon.transcript && (
          <div className="space-y-3 pt-6 border-t border-white/[0.08]">
            <span className="section-label">Transcript Excerpt</span>
            <div className="p-6 bg-[#141211] text-xs sm:text-sm text-[#9e978e] italic font-serif leading-relaxed">
              &ldquo;{sermon.transcript}&rdquo;
            </div>
          </div>
        )}
      </div>

      {/* Related Teachings */}
      {relatedSermons.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-white/[0.08]">
          <span className="section-label">Related Teachings</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedSermons.map((rel) => (
              <Link
                key={rel.id}
                href={`/sermons/${rel.slug}`}
                className="p-6 bg-[#141211] border border-white/[0.08] hover:border-[#c8a97e]/40 transition-colors group block"
              >
                <span className="text-[10px] uppercase tracking-wider text-[#c8a97e]">
                  {rel.topic}
                </span>
                <h4 className="font-serif text-xl text-[#f7f4ee] group-hover:text-[#c8a97e] transition-colors mt-1">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
