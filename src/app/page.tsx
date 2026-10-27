"use client";

import React, { useState } from "react";
import Link from "next/link";
import { devotionalProduct } from "@/data/devotionals";
import { initialSermons } from "@/data/sermons";
import { initialBooks } from "@/data/books";
import { initialMusic } from "@/data/music";
import VideoModal from "@/components/VideoModal";
import { useAudioPlayer } from "@/components/AudioPlayerContext";
import { MusicPlatformLinks } from "@/components/MusicPlatformLinks";
import { Sermon } from "@/types";
import {
  Play,
  ArrowRight,
  BookOpen,
  Headphones,
  Calendar,
  ExternalLink,
  ChevronRight,
  Flame,
  Radio,
  Disc3,
  Quote,
} from "lucide-react";

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const { playTrack } = useAudioPlayer();

  const featuredSermon = initialSermons[0] as Sermon;
  const featuredMusic = initialMusic[0];

  return (
    <div className="relative overflow-hidden bg-[#0f0e0d] text-[#f7f4ee]">
      {/* 01. HERO SECTION — EDITORIAL MAGAZINE SPREAD */}
      <section className="relative min-h-[92vh] flex items-center border-b border-white/[0.08] px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e]" /> */}
              {/* <span className="section-label">Official Ministry Platform</span> */}
            </div>

            <div className="space-y-4">
              <h1 className="display-title text-5xl sm:text-7xl lg:text-8xl font-light text-[#f7f4ee]">
                A Voice for <br />
                <span className="font-serif italic text-[#c8a97e] font-normal">
                  Revival.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-[#d6cec3]/90 italic font-light max-w-xl leading-relaxed">
                A life set apart for His presence, carrying one name — Jesus —
                to this and every future generation.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#9e978e] leading-relaxed max-w-lg font-sans">
              Evangelist Tolulope Toluwase (Tolucci) is an ordained evangelist
              cum missionary apostle, an astute teacher of God's word, a Fiery
              Revivalist, Creative media production mogul and a Prophetic
              Psalmist.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() =>
                  setSelectedVideo({
                    id: featuredSermon.youtubeId,
                    title: featuredSermon.title,
                  })
                }
                className="px-8 py-3.5 bg-[#c8a97e] text-[#0f0e0d] hover:bg-[#dec49d] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Watch Latest Message
              </button>
              <Link
                href="/about"
                className="px-8 py-3.5 border border-white/20 hover:border-[#c8a97e] text-[#f7f4ee] hover:text-[#c8a97e] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 text-center"
              >
                Read More
              </Link>
            </div>

            {/* Editorial Quick Index */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[#9e978e]">
              <Link
                href="/about"
                className="hover:text-[#c8a97e] transition-colors"
              >
                01 · About
              </Link>
              <Link
                href="/sermons"
                className="hover:text-[#c8a97e] transition-colors"
              >
                02 · Sermons
              </Link>
              <Link
                href="/devotional"
                className="hover:text-[#c8a97e] transition-colors"
              >
                03 · Devotional
              </Link>
              <Link
                href="/books"
                className="hover:text-[#c8a97e] transition-colors"
              >
                04 · Books
              </Link>
              <Link
                href="/music"
                className="hover:text-[#c8a97e] transition-colors"
              >
                05 · Music
              </Link>
            </div>
          </div>

          {/* Right Column: Cinematic High-Contrast Portraiture */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden bg-[#181615] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Tolucci.png"
                alt="Evangelist Tolucci in prayer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0d] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#141211]/90 backdrop-blur-md border border-white/[0.08]">
                {/* <p className="text-[10px] uppercase tracking-[0.22em] text-[#c8a97e] font-semibold">
                  Ministerial Profile
                </p> */}
                <h3 className="font-serif text-lg text-[#f7f4ee]">
                  Evangelist Tolulope Toluwase (Tolucci)
                </h3>
                <p className="text-xs text-[#9e978e] mt-0.5">
                  Founder & Visionary, The MASS Movement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. EDITORIAL MINISTRY STATEMENT & PHILOSOPHY */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#141211] border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="section-label">Ministry Foundation</span>
            <div className="w-8 h-[1px] bg-[#c8a97e] mx-auto mt-2" />
          </div>

          <blockquote className="text-center">
            <p className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#f7f4ee] font-light leading-snug italic max-w-4xl mx-auto">
              &ldquo;We do not seek a platform to be seen; we seek an altar
              where God alone is glorified.&rdquo;
            </p>
            <footer className="mt-4 text-xs uppercase tracking-[0.24em] text-[#c8a97e]">
              — Evangelist Tolucci
            </footer>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/[0.06] text-xs sm:text-sm text-[#d6cec3]/90 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-serif text-base text-[#f7f4ee]">
                The Prophetic Sound
              </h4>
              <p>
                Music in the Kingdom of God is not entertainment; it is
                spiritual frequency that dismantles demonic resistance and
                brings down the hand of the Lord.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-base text-[#f7f4ee]">
                The MASS Movement
              </h4>
              <p>
                An interdenominational revival army gathering tens of thousands
                across city storms, universities, and national arenas to carry
                Jesus to every generation.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-base text-[#f7f4ee]">
                The Daily Priesthood
              </h4>
              <p>
                Sustaining continuous secret-place communion through daily
                Scripture meditations, morning prayers, and consecrated living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. FEATURED MESSAGE (CINEMATIC FILM PRESENTATION) */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <span className="section-label">02 · Apostolic Archive</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f7f4ee] mt-1 font-light">
              Latest Message
            </h2>
          </div>
          <Link
            href="/sermons"
            className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
          >
            All Sermons & Teachings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151312] border border-white/[0.08]">
          {/* 16:9 Cinematic Video Display */}
          <div
            onClick={() =>
              setSelectedVideo({
                id: featuredSermon.youtubeId,
                title: featuredSermon.title,
              })
            }
            className="lg:col-span-7 aspect-video relative cursor-pointer group bg-black overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredSermon.thumbnailUrl}
              alt={featuredSermon.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/60 bg-black/60 backdrop-blur-sm flex items-center justify-center text-[#f7f4ee] group-hover:scale-110 group-hover:border-[#c8a97e] group-hover:text-[#c8a97e] transition-all">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-black/80 text-[10px] font-mono text-[#f7f4ee] uppercase tracking-wider">
              Length: {featuredSermon.duration}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-8 sm:p-10 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#9e978e]">
                <span className="text-[#c8a97e] uppercase tracking-wider font-semibold">
                  {featuredSermon.topic}
                </span>
                <span>·</span>
                <span>{featuredSermon.date}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f7f4ee] font-light leading-snug">
                {featuredSermon.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed line-clamp-3 font-sans">
                {featuredSermon.description}
              </p>
              {featuredSermon.scriptureReferences.length > 0 && (
                <div className="text-xs text-[#c8a97e] pt-1">
                  <strong>Scriptures:</strong>{" "}
                  {featuredSermon.scriptureReferences.join(" · ")}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
              <button
                onClick={() =>
                  setSelectedVideo({
                    id: featuredSermon.youtubeId,
                    title: featuredSermon.title,
                  })
                }
                className="px-6 py-2.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#dec49d] transition-all"
              >
                Watch Now
              </button>
              {featuredSermon.audioUrl && (
                <button
                  onClick={() =>
                    playTrack({
                      id: featuredSermon.id,
                      title: featuredSermon.title,
                      artist: "Evangelist Tolucci",
                      albumTitle: "Apostolic Teaching",
                      coverArt: featuredSermon.thumbnailUrl,
                      audioUrl: featuredSermon.audioUrl!,
                    })
                  }
                  className="px-4 py-2.5 border border-white/20 text-[#f7f4ee] hover:border-[#c8a97e] text-xs uppercase tracking-[0.16em] transition-all flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#c8a97e]" /> Audio
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 04. DAILY DEVOTIONAL (OPEN SPIRITUAL JOURNAL) */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#141211] border-y border-white/[0.08]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center p-6 sm:p-10 bg-[#181615] border border-white/[0.08] shadow-2xl">
            <div className="md:col-span-4">
              <div className="aspect-[3/4] overflow-hidden bg-[#1c1917]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={devotionalProduct.coverImage}
                  alt={`${devotionalProduct.title} devotional cover`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="section-label">
                    30-Day Devotional · Prayer Guide
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f7f4ee] font-light mt-1">
                    {devotionalProduct.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-2xl sm:text-3xl text-[#c8a97e] italic font-normal">
                  {devotionalProduct.subtitle}
                </h4>
              </div>

              <div className="space-y-3 text-sm text-[#d6cec3]/90 leading-relaxed font-sans">
                {devotionalProduct.description
                  .split("\n\n")
                  .map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
                {devotionalProduct.purchaseLinks.map((purchaseLink) => (
                  <a
                    key={purchaseLink.label}
                    href={purchaseLink.url}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/20 text-[#f7f4ee] text-xs uppercase tracking-[0.14em] hover:border-[#c8a97e] hover:text-[#c8a97e] transition-all"
                  >
                    {purchaseLink.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
                <Link
                  href="/devotional"
                  className="text-xs uppercase tracking-[0.16em] text-[#9e978e] hover:text-[#f7f4ee] md:ml-auto"
                >
                  Devotional Details{" "}
                  <ArrowRight className="inline w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. PUBLISHED BOOKS & LITERATURE */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <span className="section-label">04 · Written Resources</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f7f4ee] mt-1 font-light">
              Published Works
            </h2>
          </div>
          <Link
            href="/books"
            className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
          >
            All Books <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 max-w-md gap-8">
          {initialBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-[#151312] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-[#c8a97e]/40 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Book Cover with Gallery Shadow */}
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

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c8a97e]">
                    By {book.author}
                  </span>
                  <h3 className="font-serif text-2xl text-[#f7f4ee] group-hover:text-[#c8a97e] transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#9e978e] line-clamp-1 italic font-serif">
                    {book.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#d6cec3]/80 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 space-y-4">
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
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#c8a97e] hover:text-[#dec49d] transition-colors"
                >
                  Book Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06. MUSIC & PROPHETIC RELEASES */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#141211] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/[0.08] gap-4">
            <div>
              <span className="section-label">05 · Kingdom Sounds</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f7f4ee] mt-1 font-light">
                Music
              </h2>
            </div>
            <Link
              href="/music"
              className="text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d] inline-flex items-center gap-2"
            >
              Full Discography <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Featured Album Showcase */}
            <div className="lg:col-span-5 bg-[#181615] border border-white/[0.08] p-6 space-y-6">
              <div className="aspect-square relative overflow-hidden bg-black shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredMusic.coverArt}
                  alt={featuredMusic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#c8a97e] font-semibold">
                      Featured Project · {featuredMusic.releaseYear}
                    </span>
                    <h3 className="font-serif text-xl text-[#f7f4ee]">
                      {featuredMusic.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#d6cec3]/80 leading-relaxed font-sans">
                {featuredMusic.description}
              </p>

              {/* Streaming Channels */}
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.entries(featuredMusic.streamingLinks).map(
                  ([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-white/20 text-[#f7f4ee] text-[11px] uppercase tracking-wider hover:border-[#c8a97e] transition-colors"
                    >
                      {platform === "appleMusic"
                        ? "Apple Music"
                        : platform === "youtubeMusic"
                          ? "YouTube Music"
                          : "Spotify"}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* Track Listing with Direct Audio Preview */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#9e978e]">
                Featured Songs
              </h3>
              <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {featuredMusic.tracks.map((track, idx) => (
                  <div
                    key={track.id}
                    className="py-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 group hover:bg-white/[0.02] px-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <a
                        href={track.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#f7f4ee] hover:text-[#c8a97e] transition-colors"
                      >
                        {idx + 1}. {track.title}
                      </a>
                      {track.featuredArtist && (
                        <p className="text-[11px] text-[#9e978e]">
                          with {track.featuredArtist}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#9e978e]">
                        {track.duration}
                      </span>
                      <MusicPlatformLinks track={track} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08. AUDIENCE SUBSCRIBER BANNER */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[#141211] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="section-label">Stay Connected</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f7f4ee] font-light">
            Receive the Word & Prophetic Insights Daily
          </h2>
          <p className="text-xs sm:text-sm text-[#9e978e] max-w-xl mx-auto leading-relaxed">
            Join thousands of believers receiving morning devotionals, sermon
            notifications, and updates directly in their inbox.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/#footer-newsletter"
              className="px-8 py-3.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#dec49d] transition-all"
            >
              Subscribe for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          youtubeId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
