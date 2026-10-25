"use client";

import React, { useState } from "react";
import { initialMusic, musicArtistProfiles } from "@/data/music";
import { MusicRelease } from "@/types";
import { ExternalLink } from "lucide-react";
import {
  MusicPlatformIconLink,
  MusicPlatformLinks,
} from "@/components/MusicPlatformLinks";

export default function MusicPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const filteredReleases = initialMusic.filter((rel) => {
    if (selectedFilter === "all") return true;
    return rel.type === selectedFilter;
  });

  const featured = initialMusic[0] as MusicRelease;

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-20 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">05 · Kingdom Sounds</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee]">
          Prophetic Discography
        </h1>
        <p className="text-sm sm:text-base text-[#9e978e] leading-relaxed font-sans">
          Indigenous praise, spontaneous worship, and spiritual warfare anthems
          released by Evangelist Tolucci and The MASS Movement.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-y border-white/[0.08] py-5">
        <span className="mr-1 text-xs uppercase tracking-[0.16em] text-[#9e978e]">
          View full profiles
        </span>
        <MusicPlatformIconLink
          platform="spotify"
          url={musicArtistProfiles.spotify}
        />
        <MusicPlatformIconLink
          platform="appleMusic"
          url={musicArtistProfiles.appleMusic}
        />
        <MusicPlatformIconLink
          platform="youtubeMusic"
          url={musicArtistProfiles.youtubeMusic}
        />
      </div>

      {/* Featured Project Spread */}
      {featured && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#151312] border border-white/[0.08] p-8 sm:p-12">
          <div className="lg:col-span-5 aspect-square bg-black overflow-hidden relative shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.coverArt}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="section-label">
                Featured Release · {featured.releaseYear}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f7f4ee] font-light">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed font-sans">
                {featured.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.08] pt-4">
              <span className="mr-1 text-xs text-[#9e978e]">Listen on</span>
              {Object.entries(featured.streamingLinks).map(
                ([platform, url]) => (
                  <MusicPlatformIconLink
                    key={platform}
                    platform={
                      platform as "spotify" | "appleMusic" | "youtubeMusic"
                    }
                    url={url}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          {["all", "album", "ep"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFilter(type)}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors ${
                selectedFilter === type
                  ? "bg-[#c8a97e] text-[#0f0e0d] font-semibold"
                  : "text-[#9e978e] hover:text-[#f7f4ee] border border-white/[0.08]"
              }`}
            >
              {type === "all" ? "All Releases" : type.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Releases Catalogue */}
      <div className="space-y-16">
        {filteredReleases.map((release) => (
          <div
            key={release.id}
            className="bg-[#141211] border border-white/[0.08] p-8 sm:p-10 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Cover Art */}
              <div className="md:col-span-4 aspect-square overflow-hidden bg-black shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={release.coverArt}
                  alt={release.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Release Metadata & Tracklist */}
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-1">
                  <span className="section-label">
                    {release.type.replace("-", " ")} · {release.releaseYear}
                  </span>
                  <h3 className="font-serif text-3xl text-[#f7f4ee] font-light">
                    {release.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed font-sans pt-1">
                    {release.description}
                  </p>
                </div>

                {/* Tracklist */}
                <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {release.tracks.map((track, i) => (
                    <div
                      key={track.id}
                      className="py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 group hover:bg-white/[0.02] px-2 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="truncate">
                          <a
                            href={track.appleMusicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm font-medium text-[#f7f4ee] hover:text-[#c8a97e] transition-colors block truncate"
                          >
                            {i + 1}. {track.title}
                          </a>
                          {track.featuredArtist && (
                            <span className="text-[10px] text-[#9e978e]">
                              with {track.featuredArtist}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#9e978e]">
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
        ))}
      </div>
    </div>
  );
}
