"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, ExternalLink } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

const CATEGORIES = [
  { id: "preach_minister", label: "Invitation to Preach / Minister" },
  { id: "conference", label: "Speaking & Conference Keynote" },
  { id: "general", label: "General Ministry Enquiry" },
  { id: "media", label: "Media & Interview Request" },
  { id: "book_music", label: "Book & Music Enquiries" },
  { id: "partnership", label: "Partnership & Collaboration" },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const prefillCategory = searchParams.get("category");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: prefillCategory || "preach_minister",
    organization: "",
    eventDate: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (prefillCategory) {
      setFormData((prev) => ({ ...prev, category: prefillCategory }));
    }
  }, [prefillCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please provide your name, email address, and message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit enquiry. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-20 bg-[#0f0e0d] text-[#f7f4ee]">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="section-label">06 · Secretariat Correspondence</span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light text-[#f7f4ee]">
          Invitations & Enquiries
        </h1>
        <p className="text-sm sm:text-base text-[#9e978e] leading-relaxed font-sans">
          To invite Evangelist Tolucci to minister at your church, conference,
          or campus gathering, please submit your request to our secretariat
          below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/[0.08] pt-12">
        {/* Secretariat Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="section-label">Ministry Secretariat</span>
            <h3 className="font-serif text-2xl text-[#f7f4ee]">
              Itinerary Protocols
            </h3>
            <p className="text-xs sm:text-sm text-[#d6cec3]/80 leading-relaxed font-sans">
              Our scheduling team prayerfully processes all requests. Please
              provide as much context as possible regarding proposed meeting
              dates, location, and the spiritual burden of the conference.
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#c8a97e]" />
              <a
                href="mailto:info@evangelisttolucci.org"
                className="hover:text-[#c8a97e] transition-colors"
              >
                info@evangelisttolucci.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#c8a97e]" />
              <span>+234 (0) 906 750 8095</span>
            </div>
          </div>

          {/* WhatsApp Direct Liaison */}
          <div className="p-6 bg-[#141211] border border-white/[0.08] space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#25D366] font-semibold block">
              Urgent Itinerary Liaison
            </span>
            <p className="text-[11px] text-[#9e978e]">
              For direct communication with the ministry itinerary office on
              WhatsApp:
            </p>
            <a
              href="https://wa.me/2349067508095?text=Greetings%20in%20Jesus%20name.%20I%20am%20reaching%20out%20regarding%20an%20invitation%20for%20Evangelist%20Tolucci."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline pt-1"
            >
              Open WhatsApp Chat <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-6 bg-[#141211] border border-white/[0.08] space-y-4">
            <div>
              <span className="section-label">Follow & Connect</span>
              <p className="text-xs text-[#9e978e] mt-2">
                Find Evangelist Tolucci on social media.
              </p>
            </div>
            <SocialLinks showLabels />
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#151312] border border-white/[0.08] p-8 sm:p-12">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <h3 className="font-serif text-3xl text-[#f7f4ee]">
                  Enquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-[#d6cec3] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. The ministry secretariat has
                  received your submission and will prayerfully respond via
                  email.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.16em] font-semibold"
                  >
                    Submit Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="section-label">Communication Form</span>
                  <h3 className="font-serif text-2xl text-[#f7f4ee] font-light mt-1">
                    Meeting Details
                  </h3>
                </div>

                {error && (
                  <div className="p-3 bg-red-950/50 border border-red-800 text-xs text-red-200">
                    {error}
                  </div>
                )}

                {/* Category Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-2">
                    Enquiry Type <span className="text-[#c8a97e]">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] focus:outline-none focus:border-[#c8a97e]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-[#141211]"
                      >
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                      Full Name <span className="text-[#c8a97e]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pastor David Adebayo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                      Email Address <span className="text-[#c8a97e]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="pastor@church.org"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                </div>

                {/* Phone & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 ..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                      Organization / Church Name
                    </label>
                    <input
                      type="text"
                      placeholder="Church or Organization"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
                    />
                  </div>
                </div>

                {/* Proposed Date & Location */}
                {(formData.category === "preach_minister" ||
                  formData.category === "conference") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#12100f] border border-white/[0.06]">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#c8a97e] mb-1">
                        Proposed Date(s)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Nov 15 - 17, 2026"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-[#171513] border border-white/[0.1] text-xs text-[#f7f4ee] focus:outline-none focus:border-[#c8a97e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#c8a97e] mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. London, UK / Lagos, Nigeria"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#171513] border border-white/[0.1] text-xs text-[#f7f4ee] focus:outline-none focus:border-[#c8a97e]"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9e978e] mb-1">
                    Your Message / Meeting Scope{" "}
                    <span className="text-[#c8a97e]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about the meeting, audience, and spiritual objectives..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#12100f] border border-white/[0.1] text-xs text-[#f7f4ee] placeholder-[#6b635b] focus:outline-none focus:border-[#c8a97e]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#c8a97e] text-[#0f0e0d] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#dec49d] transition-all disabled:opacity-50"
                >
                  {loading
                    ? "Submitting Details..."
                    : "Send Ministry Invitation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-[#9e978e]">
          Loading ministry correspondence form...
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
