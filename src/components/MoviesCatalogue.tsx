"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";

const films = [
  {
    title: "Apostle Ben",
    year: "2022",
    description:
      "A feature-length gospel movie exploring Christian life, ethics, and conduct in the marketplace and workplace.",
    youtubeId: "r9loYbvIvQA",
  },
  {
    title: "Mission Malaika",
    year: "2021",
    description:
      "The debut feature film from the Mass Global Impact Foundation (Mass Movement), following a fellowship's mission outreach to the hamlet of Malika.",
    youtubeId: "x4hxkExlCwY",
  },
];

export default function MoviesCatalogue() {
  const [selectedFilm, setSelectedFilm] = useState<{
    title: string;
    youtubeId: string;
  } | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 text-[#f7f4ee] sm:px-8 sm:py-24 lg:px-12">
      <header className="max-w-3xl space-y-4">
        <span className="section-label">Film & Storytelling</span>
        <h1 className="font-serif text-5xl font-light sm:text-7xl">Movies</h1>
        <p className="font-sans text-sm leading-relaxed text-[#9e978e] sm:text-base">
          Stories of faith, purpose, and transformation produced and directed
          by Evangelist Tolucci.
        </p>
      </header>

      <section
        aria-labelledby="featured-film-title"
        className="grid items-center gap-8 border border-white/[0.08] bg-[#151312] p-6 sm:gap-12 sm:p-10 lg:grid-cols-12 lg:p-12"
      >
        <div className="overflow-hidden bg-black shadow-2xl lg:col-span-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/revival.jpg"
            alt="Jàndùkú Ìsojí (Revival Bandits) film cover"
            className="h-full max-h-[620px] w-full object-cover"
          />
        </div>

        <div className="space-y-7 lg:col-span-6">
          <div className="space-y-3">
            <span className="section-label">
              Now streaming · 2024 · Featured film
            </span>
            <h2
              id="featured-film-title"
              className="font-serif text-4xl font-light leading-tight sm:text-5xl"
            >
              Jàndùkú Ìsojí
            </h2>
            <p className="font-serif text-xl italic text-[#c8a97e]">
              Revival Bandits
            </p>
            <p className="font-sans text-sm leading-relaxed text-[#d6cec3]/85 sm:text-base">
              A drama film, told 80% in Yoruba with subtitles, about a
              community church presentation that takes an unexpected turn.
              Acquired by Africa Magic and premiered across Sub-Saharan Africa.
            </p>
          </div>

          <div className="border-y border-white/[0.08] py-5">
            <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#9e978e]">
              Watch on
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dstv.png"
                alt="DStv"
                className="h-9 w-auto max-w-[110px] object-contain"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/am.png"
                alt="Africa Magic"
                className="h-9 w-auto max-w-[160px] object-contain"
              />
            </div>
            <p className="mt-4 font-sans text-sm text-[#d6cec3]/85">
              DStv channel 157 · Africa Magic Yoruba
              <span className="mx-2 text-[#c8a97e]">/</span>
              GOtv channel 5
            </p>
          </div>

          <p className="font-sans text-xs leading-relaxed text-[#9e978e]">
            Channel availability and schedules may vary by location and
            provider.
          </p>
        </div>
      </section>

      <section aria-labelledby="more-films-title" className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-2">
            <span className="section-label">More films</span>
            <h2
              id="more-films-title"
              className="font-serif text-3xl font-light sm:text-4xl"
            >
              Watch the stories
            </h2>
          </div>
          <span className="font-sans text-xs text-[#9e978e]">
            Full films on YouTube
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {films.map((film) => (
            <article
              key={film.title}
              className="flex flex-col justify-between gap-8 border border-white/[0.08] bg-[#151312] p-7 sm:p-9"
            >
              <div className="space-y-4">
                <span className="section-label">Feature film · {film.year}</span>
                <h3 className="font-serif text-3xl font-light sm:text-4xl">
                  {film.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#9e978e]">
                  {film.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSelectedFilm({
                    title: film.title,
                    youtubeId: film.youtubeId,
                  })
                }
                className="inline-flex w-fit items-center gap-3 border border-[#c8a97e]/60 px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#f7f4ee] transition-colors hover:bg-[#c8a97e] hover:text-[#0f0e0d]"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch film
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <VideoModal
        isOpen={selectedFilm !== null}
        onClose={() => setSelectedFilm(null)}
        youtubeId={selectedFilm?.youtubeId ?? ""}
        title={selectedFilm?.title ?? ""}
      />
    </div>
  );
}
