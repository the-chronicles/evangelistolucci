"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          preferences: { dailyDevotional: true, ministryNewsletter: true },
          source: "footer",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          success: true,
          message: data.message || "Subscribed successfully!",
        });
        setEmail("");
      } else {
        setStatus({
          success: false,
          message: data.error || "Failed to subscribe.",
        });
      }
    } catch {
      setStatus({
        success: false,
        message: "Connection error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="footer-newsletter"
      className="bg-[#0b0a0a] border-t border-white/[0.08] pt-20 pb-24 md:pb-16 text-[#9e978e]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand & Calling */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="tolucci logo"
                className="w-32 h-auto"
              />
            </Link>
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#f7f4ee] font-semibold">
                Connect with Tolucci
              </h4>
              <SocialLinks />
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#f7f4ee] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/sermons"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/devotional"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Devotional
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/music"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Channels */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#f7f4ee] font-semibold">
              Channels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://music.apple.com/artist/tolucci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Apple Music
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/artist/tolucci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href="https://audiomack.com/tolucci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  Audiomack
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@tolucci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8a97e] transition-colors"
                >
                  YouTube
                </a>
              </li>
              {/* <li><a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a97e] transition-colors">WhatsApp Direct</a></li> */}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#f7f4ee] font-semibold">
              Receive the Word
            </h4>
            <p className="text-xs text-[#9e978e]">
              Get morning devotionals and ministry notices delivered to your
              email.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#141211] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#dec49d] transition-all flex items-center justify-center gap-1.5"
              >
                {loading ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {status && (
              <p
                className={`text-[10px] ${status.success ? "text-[#c8a97e]" : "text-red-400"}`}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Legal & Secretariat */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b635b] gap-4 font-mono">
          <p>
            © {new Date().getFullYear()} Evangelist Tolucci. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#d6cec3] transition-colors"
            >
              Privacy Policy
            </Link>
            {/* <Link
              href="/contact"
              className="hover:text-[#d6cec3] transition-colors"
            >
              Secretariat Contact
            </Link>
            <Link
              href="/admin"
              className="hover:text-[#d6cec3] transition-colors"
            >
              Staff Portal
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
