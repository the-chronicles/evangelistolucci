"use client";

import React, { useState } from "react";
import { initialSermons } from "@/data/sermons";
import VideoModal from "@/components/VideoModal";
import { useAudioPlayer } from "@/components/AudioPlayerContext";
import { Play, Headphones, Search, ExternalLink } from "lucide-react";
import { Sermon } from "@/types";

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const { playTrack } = useAudioPlayer();

  const topics = [
    "All",
    "Consecration",
    "Revival",
    "Prayer & Warfare",
    "Holy Spirit",
    "Discipleship",
    "Kingdom Identity",
    "Teaching",
    "Worship",
  ];

  const filteredSermons = initialSermons.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scriptureReferences.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesTopic =
      selectedTopic === "All" ||
      s.topic.toLowerCase() === selectedTopic.toLowerCase();
    return matchesSearch && matchesTopic;
  });

  const featured = initialSermons[0] as Sermon;

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-20 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">02 · Apostolic Teachings</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee]">
          Sermons & Messages
        </h1>
        <p className="text-sm sm:text-base text-[#9e978e] leading-relaxed font-sans">
          Deep, Scripture-saturated messages on prayer warfare, consecration,
          the Holy Spirit, and generational revival by Evangelist Tolucci.
        </p>
        <a
          href="https://www.youtube.com/@TolucciTV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#c8a97e] hover:text-[#dec49d]"
        >
          View Tolucci TV <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Featured Sermon */}
      {featured && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151312] border border-white/[0.08]">
          <div
            onClick={() =>
              setSelectedVideo({
                id: featured.youtubeId,
                title: featured.title,
              })
            }
            className="lg:col-span-7 aspect-video relative cursor-pointer group bg-black overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.thumbnailUrl}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/60 bg-black/60 backdrop-blur-sm flex items-center justify-center text-[#f7f4ee] group-hover:scale-110 group-hover:border-[#c8a97e] group-hover:text-[#c8a97e] transition-all">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-black/80 text-[10px] font-mono text-[#f7f4ee]">
              {featured.duration}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#9e978e]">
                <span className="text-[#c8a97e] uppercase tracking-wider font-semibold">
                  Featured · {featured.topic}
                </span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#f7f4ee] font-light leading-snug">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed line-clamp-3">
                {featured.description}
              </p>
              {featured.scriptureReferences.length > 0 && (
                <div className="text-xs text-[#c8a97e]">
                  <strong>Scripture:</strong>{" "}
                  {featured.scriptureReferences.join(" · ")}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
              <button
                onClick={() =>
                  setSelectedVideo({
                    id: featured.youtubeId,
                    title: featured.title,
                  })
                }
                className="px-6 py-2.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#dec49d] transition-all"
              >
                Watch Teaching
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-6 border-t border-white/[0.08] pt-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search teachings by topic or scripture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#141211] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
            />
            <Search className="w-3.5 h-3.5 text-[#9e978e] absolute left-3 top-3.5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                  selectedTopic.toLowerCase() === t.toLowerCase()
                    ? "bg-[#c8a97e] text-[#0f0e0d] font-semibold"
                    : "text-[#9e978e] hover:text-[#f7f4ee] border border-white/[0.08]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sermons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSermons.map((sermon) => (
          <div
            key={sermon.id}
            className="bg-[#141211] border border-white/[0.08] hover:border-[#c8a97e]/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Thumbnail */}
              <div
                onClick={() =>
                  setSelectedVideo({
                    id: sermon.youtubeId,
                    title: sermon.title,
                  })
                }
                className="aspect-video relative overflow-hidden bg-black cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sermon.thumbnailUrl}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/60 bg-black/60 flex items-center justify-center text-[#f7f4ee] group-hover:scale-110 group-hover:border-[#c8a97e] group-hover:text-[#c8a97e] transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-[#f7f4ee]">
                  {sermon.duration}
                </div>
              </div>

              {/* Text */}
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#9e978e]">
                  <span className="text-[#c8a97e] uppercase tracking-wider font-semibold">
                    {sermon.topic}
                  </span>
                  <span>{sermon.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#f7f4ee] group-hover:text-[#c8a97e] transition-colors leading-snug font-light">
                  {sermon.title}
                </h3>
                <p className="text-xs text-[#d6cec3]/80 line-clamp-2 leading-relaxed">
                  {sermon.description}
                </p>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="p-6 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between gap-4">
              {sermon.audioUrl && (
                <button
                  onClick={() =>
                    playTrack({
                      id: sermon.id,
                      title: sermon.title,
                      artist: "Evangelist Tolucci",
                      albumTitle: "Apostolic Teaching",
                      coverArt: sermon.thumbnailUrl,
                      audioUrl: sermon.audioUrl!,
                    })
                  }
                  className="text-xs uppercase tracking-wider text-[#9e978e] hover:text-[#c8a97e] flex items-center gap-1.5"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#c8a97e]" /> Audio
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSermons.length === 0 && (
        <div className="text-center py-12 text-[#9e978e]">
          No teachings found matching your search.
        </div>
      )}

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
