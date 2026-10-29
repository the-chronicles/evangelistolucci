"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Play, Shield } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Sermons", href: "/sermons" },
  { name: "Devotional", href: "/devotional" },
  { name: "Books", href: "/books" },
  { name: "Music", href: "/music" },
  { name: "Movies", href: "/movies" },
  // { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#12100f]/95 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-[#0f0e0d]/90 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <Link href="/" className="flex flex-col group">
            <img
              src="/images/logo.png"
              alt="tolucci logo"
              className="w-32 h-auto"
            />
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium ${
                    isActive
                      ? "text-[#c8a97e] border-b border-[#c8a97e] pb-1"
                      : "text-[#d6cec3]/80 hover:text-[#f7f4ee] hover:border-b hover:border-white/20 pb-1"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-[#c8a97e]/60 text-[#f7f4ee] hover:bg-[#c8a97e] hover:text-[#0f0e0d] text-[11px] font-sans font-medium uppercase tracking-[0.16em] transition-all duration-300"
            >
              Contact
            </Link>
            {/* <Link
              href="/admin"
              className="p-2 text-[#9e978e] hover:text-[#c8a97e] transition-colors"
              title="Ministry Staff Portal"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/contact"
              className="sm:hidden px-3 py-1.5 border border-[#c8a97e]/60 text-[#f7f4ee] text-[10px] uppercase tracking-wider"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f7f4ee] hover:text-[#c8a97e]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141211] border-b border-white/[0.08] px-6 py-8 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] py-2 border-b border-white/[0.04] transition-colors ${
                    isActive ? "text-[#c8a97e] font-semibold" : "text-[#d6cec3]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          {/* <div className="pt-4 flex items-center justify-between text-xs text-[#9e978e]">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 hover:text-[#c8a97e]"
            >
              <Shield className="w-3.5 h-3.5" /> Staff Portal
            </Link>
            <span>v1.0 Official</span>
          </div> */}
        </div>
      )}
    </header>
  );
}
