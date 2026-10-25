"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-24 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Top Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">Profile & Calling</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee] leading-tight">
          Evangelist Tolucci
        </h1>
        <p className="text-xl sm:text-2xl font-serif italic text-[#c8a97e] font-light">
          Toluwase Tolulope Timothy
        </p>
      </div>

      {/* Main Narrative Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/[0.08] pt-12">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-[#181615] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Tolucci.png"
              alt="Evangelist Tolucci"
              className="w-full h-full object-cover"
            />
          </div>
          {/* <p className="text-xs text-[#9e978e] font-mono tracking-wide">
            Toluwase Tolulope Timothy, popularly known as Evangelist Tolucci
          </p> */}
        </div>

        {/* Right Column: Editorial Text */}
        <div className="lg:col-span-7 space-y-8 text-sm sm:text-base text-[#d6cec3]/90 leading-relaxed font-sans">
          <p className="first-letter:font-serif first-letter:text-6xl first-letter:text-[#c8a97e] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            Toluwase Tolulope Timothy, popularly known as Evangelist Tolucci, is
            an ordained minister, an astute teacher of God&apos;s word, a fiery
            revivalist, and a prophetic psalmist.
          </p>

          <p>
            He is the Founder and President of the multi-expression ministry
            MASS Global Impact Foundation, popularly known as The MASS Movement
            in and around South-West Nigeria.
          </p>

          <p>
            He is a visionary and transformational leader committed to raising a
            generation of believers rooted in kingdom values as they fulfill
            God&apos;s mandate across the mountains of influence.
          </p>

          <p>
            He is an astute professional with a background in Industrial
            Mathematics, an MBA in Financial Management, and years of experience
            in Corporate Finance, Banking, and Governance.
          </p>

          <p>
            His multimedia production competencies are widely acknowledged in
            Brand Activations, Entertainment Productions, Broadcast, and kingdom
            media.
          </p>

          <p>
            Evangelist Tolucci transitioned from the corporate world into
            full-time ministry following a clear conviction toward his kingdom
            assignment. He is widely known for the MASS Prophetic and Revival
            Crusades held in different cities and campuses in and around
            South-West Nigeria.
          </p>

          <p>
            He is the Proprietor of MASS Discipleship School, with campuses in
            several cities, where he grooms young believers for systems,
            leadership, and governance.
          </p>

          <p>
            He is married to Ibukunoluwa, a global wealth manager, analyst, and
            advisor. Together they have two teenagers, Zoe and Noelle.
          </p>
        </div>
      </div>

      {/* Invitation CTA */}
      <div className="text-center py-12 border-t border-white/[0.08] space-y-6">
        <h3 className="font-serif text-3xl text-[#f7f4ee] font-light">
          Invite Evangelist Tolucci
        </h3>
        <p className="text-xs sm:text-sm text-[#9e978e] max-w-md mx-auto">
          For teaching and prayer gatherings, conferences, retreats, seminars,
          please reach out to our secretariat.
        </p>
        <Link
          href="/contact?category=preach_minister"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#dec49d] transition-all"
        >
          Submit Ministry Invitation <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
