"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initialDevotionals } from "@/data/devotionals";
import { initialSermons } from "@/data/sermons";
import { initialBooks } from "@/data/books";
import { initialMusic } from "@/data/music";
import { Subscriber, ContactEnquiry, Devotional, Sermon } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  Users,
  MessageSquare,
  Music,
  Settings,
  Plus,
  CheckCircle,
  Clock,
  Download,
  Search,
  ExternalLink,
  Shield,
  LogOut,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "devotionals"
    | "sermons"
    | "subscribers"
    | "enquiries"
    | "settings"
  >("overview");

  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [devotionals, setDevotionals] =
    useState<Devotional[]>(initialDevotionals);
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [loading, setLoading] = useState(true);

  // New Devotional Form State
  const [newDevTitle, setNewDevTitle] = useState("");
  const [newDevScripture, setNewDevScripture] = useState("");
  const [newDevScriptureText, setNewDevScriptureText] = useState("");
  const [newDevExcerpt, setNewDevExcerpt] = useState("");
  const [newDevContent, setNewDevContent] = useState("");
  const [newDevPrayer, setNewDevPrayer] = useState("");
  const [devSaving, setDevSaving] = useState(false);
  const [devMsg, setDevMsg] = useState("");

  // New Sermon Form State
  const [newSermonTitle, setNewSermonTitle] = useState("");
  const [newSermonTopic, setNewSermonTopic] = useState("Revival");
  const [newSermonYoutubeId, setNewSermonYoutubeId] = useState("");
  const [newSermonDesc, setNewSermonDesc] = useState("");
  const [sermonSaving, setSermonSaving] = useState(false);
  const [sermonMsg, setSermonMsg] = useState("");

  // Check auth
  useEffect(() => {
    const isAuth = sessionStorage.getItem("tolucci_admin_authenticated");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    // Fetch live subscribers and enquiries
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, enqRes] = await Promise.all([
        fetch("/api/subscribers"),
        fetch("/api/enquiries"),
      ]);
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData.subscribers || []);
      }
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch (err) {
      console.warn("Failed to fetch data in admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    enquiryId: string,
    newStatus: ContactEnquiry["status"],
  ) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === enquiryId ? { ...e, status: newStatus } : e,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleCreateDevotional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevTitle || !newDevContent) return;
    setDevSaving(true);
    setDevMsg("");

    const newDev: Devotional = {
      id: `dev-${Date.now()}`,
      slug: newDevTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      title: newDevTitle,
      date: new Date().toISOString().split("T")[0] as string,
      scriptureReference: newDevScripture || "Leviticus 6:13",
      scriptureText:
        newDevScriptureText ||
        "The fire must be kept burning on the altar continuously; it must not go out.",
      excerpt: newDevExcerpt || newDevContent.slice(0, 140) + "...",
      content: newDevContent.split("\n\n").filter(Boolean),
      reflectionQuestions: [
        "How will you maintain the secret place altar today?",
      ],
      prayer:
        newDevPrayer ||
        "Lord, keep my heart set on fire for Your glory. In Jesus name, Amen.",
      tags: ["Revival", "Devotional", "Prayer"],
      author: "Evangelist Tolucci",
      readingTimeMinutes: 4,
    };

    try {
      const res = await fetch("/api/devotionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDev),
      });
      if (res.ok) {
        setDevotionals([newDev, ...devotionals]);
        setDevMsg("Devotional published successfully!");
        setNewDevTitle("");
        setNewDevScripture("");
        setNewDevScriptureText("");
        setNewDevExcerpt("");
        setNewDevContent("");
        setNewDevPrayer("");
      }
    } catch {
      setDevMsg("Failed to save devotional");
    } finally {
      setDevSaving(false);
    }
  };

  const handleCreateSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSermonTitle || !newSermonYoutubeId) return;
    setSermonSaving(true);
    setSermonMsg("");

    const newSermon: Sermon = {
      id: `sermon-${Date.now()}`,
      slug: newSermonTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      title: newSermonTitle,
      date: new Date().toISOString().split("T")[0] as string,
      topic: newSermonTopic,
      scriptureReferences: ["Joel 2:28", "Acts 1:8"],
      description: newSermonDesc,
      youtubeId: newSermonYoutubeId,
      duration: "1h 05m",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    };

    try {
      const res = await fetch("/api/sermons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSermon),
      });
      if (res.ok) {
        setSermons([newSermon, ...sermons]);
        setSermonMsg("Sermon published successfully!");
        setNewSermonTitle("");
        setNewSermonYoutubeId("");
        setNewSermonDesc("");
      }
    } catch {
      setSermonMsg("Failed to save sermon");
    } finally {
      setSermonSaving(false);
    }
  };

  const exportSubscribersCsv = () => {
    const headers =
      "ID,Name,Email,Daily Devotional,Ministry Newsletter,Subscribed At,Source\n";
    const rows = subscribers
      .map(
        (s) =>
          `"${s.id}","${s.name || ""}","${s.email}",${s.preferences.dailyDevotional},${s.preferences.ministryNewsletter},"${s.subscribedAt}","${s.source}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tolucci-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tolucci_admin_authenticated");
    router.push("/admin/login");
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#232332] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="serif-heading text-2xl sm:text-3xl text-[#faf8f5]">
              Ministry Administration & CMS
            </h1>
            <p className="text-xs text-[#9c978e]">
              Platform Publishing Engine · Evangelist Tolucci Official
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2 text-[#9c978e] hover:text-[#faf8f5] rounded-lg border border-[#2b2b3d] hover:border-[#c5a880] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg bg-[#181824] border border-[#2b2b3d] text-xs text-[#faf8f5] hover:text-red-400 hover:border-red-800 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1c1c28]">
        {[
          {
            id: "overview",
            label: "Overview & Metrics",
            icon: LayoutDashboard,
          },
          {
            id: "devotionals",
            label: `Devotionals (${devotionals.length})`,
            icon: BookOpen,
          },
          { id: "sermons", label: `Sermons (${sermons.length})`, icon: Radio },
          {
            id: "subscribers",
            label: `Subscribers (${subscribers.length})`,
            icon: Users,
          },
          {
            id: "enquiries",
            label: `Invitations & Enquiries (${enquiries.length})`,
            icon: MessageSquare,
          },
          { id: "settings", label: "SEO & Announcements", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#c5a880] text-[#0a0a0d] shadow-md shadow-[#c5a880]/15"
                  : "bg-[#12121a] text-[#9c978e] hover:text-[#faf8f5] border border-[#232332]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#111119] border border-[#232332] space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#9c978e]">
                Total Subscribers
              </span>
              <div className="serif-heading text-3xl text-[#c5a880] font-bold">
                {subscribers.length}
              </div>
              <p className="text-[11px] text-[#6b6760]">
                Daily Devotional & Newsletter
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111119] border border-[#232332] space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#9c978e]">
                Ministry Enquiries
              </span>
              <div className="serif-heading text-3xl text-[#c5a880] font-bold">
                {enquiries.length}
              </div>
              <p className="text-[11px] text-[#6b6760]">
                {enquiries.filter((e) => e.status === "new").length} New /
                Unreviewed
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111119] border border-[#232332] space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#9c978e]">
                Published Sermons
              </span>
              <div className="serif-heading text-3xl text-[#faf8f5] font-bold">
                {sermons.length}
              </div>
              <p className="text-[11px] text-[#6b6760]">
                Video & Audio Teachings
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111119] border border-[#232332] space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#9c978e]">
                Devotionals
              </span>
              <div className="serif-heading text-3xl text-[#faf8f5] font-bold">
                {devotionals.length}
              </div>
              <p className="text-[11px] text-[#6b6760]">Daily Meditations</p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#13131d] border border-[#c5a880]/30 space-y-4">
              <h3 className="serif-heading text-xl text-[#faf8f5] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a880]" /> Quick Publishing
                Shortcuts
              </h3>
              <p className="text-xs text-[#dcd6cc] leading-relaxed">
                Publish a fresh morning devotional or add the latest sermon
                video straight to the official platform without touching any
                code.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setActiveTab("devotionals")}
                  className="px-4 py-2 rounded-lg bg-[#c5a880] text-[#0a0a0d] text-xs font-semibold hover:bg-[#e0cca9]"
                >
                  Write Devotional
                </button>
                <button
                  onClick={() => setActiveTab("sermons")}
                  className="px-4 py-2 rounded-lg bg-[#181824] border border-[#c5a880]/30 text-xs text-[#faf8f5] hover:border-[#c5a880]"
                >
                  Add Sermon
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#13131d] border border-[#232332] space-y-4">
              <h3 className="serif-heading text-xl text-[#faf8f5] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c5a880]" /> Subscriber Audience
                Health
              </h3>
              <p className="text-xs text-[#dcd6cc] leading-relaxed">
                Audience is growing across the first-visit dialog, devotionals
                page, and footer form. Download the CSV list anytime to sync
                with Mailchimp, ConvertKit, or SendGrid.
              </p>
              <div className="pt-2">
                <button
                  onClick={exportSubscribersCsv}
                  className="px-4 py-2 rounded-lg bg-[#181824] border border-[#2b2b3d] text-xs text-[#faf8f5] hover:border-[#c5a880] flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a880]" /> Export
                  Subscribers to CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: DEVOTIONALS */}
      {activeTab === "devotionals" && (
        <div className="space-y-8">
          {/* Create Devotional Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111119] border border-[#c5a880]/30 space-y-5">
            <h3 className="serif-heading text-2xl text-[#faf8f5]">
              Publish New Daily Devotional
            </h3>
            {devMsg && (
              <div className="p-3 bg-green-950/40 border border-green-800 rounded-lg text-xs text-green-300">
                {devMsg}
              </div>
            )}
            <form onSubmit={handleCreateDevotional} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                    Devotional Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Consecrating the Midnight Watch"
                    value={newDevTitle}
                    onChange={(e) => setNewDevTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                    Scripture Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Psalm 119:62"
                    value={newDevScripture}
                    onChange={(e) => setNewDevScripture(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                  Scripture Verse Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. At midnight I will rise to give thanks unto thee because of thy righteous judgments."
                  value={newDevScriptureText}
                  onChange={(e) => setNewDevScriptureText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                  Main Meditation Content (Separate paragraphs with double
                  enter)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter the full spiritual reading..."
                  value={newDevContent}
                  onChange={(e) => setNewDevContent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                  Closing Consecration Prayer
                </label>
                <input
                  type="text"
                  placeholder="e.g. Father, awaken my spirit in the night seasons..."
                  value={newDevPrayer}
                  onChange={(e) => setNewDevPrayer(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <button
                type="submit"
                disabled={devSaving}
                className="px-6 py-2.5 rounded-lg bg-[#c5a880] text-[#0a0a0d] text-xs font-semibold hover:bg-[#e0cca9] transition-all disabled:opacity-50"
              >
                {devSaving ? "Publishing..." : "Publish to Devotional Archive"}
              </button>
            </form>
          </div>

          {/* Published Devotionals List */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#9c978e] font-semibold">
              Currently Live Devotionals ({devotionals.length})
            </h4>
            <div className="space-y-2">
              {devotionals.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-xl bg-[#111119] border border-[#232332] flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] text-[#c5a880]">
                      {d.date} · {d.scriptureReference}
                    </span>
                    <h4 className="text-sm font-semibold text-[#faf8f5]">
                      {d.title}
                    </h4>
                  </div>
                  <a
                    href={`/devotional/${d.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#c5a880] hover:underline inline-flex items-center gap-1"
                  >
                    View Live <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: SERMONS */}
      {activeTab === "sermons" && (
        <div className="space-y-8">
          {/* Create Sermon Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111119] border border-[#c5a880]/30 space-y-5">
            <h3 className="serif-heading text-2xl text-[#faf8f5]">
              Add New Sermon Video / Teaching
            </h3>
            {sermonMsg && (
              <div className="p-3 bg-green-950/40 border border-green-800 rounded-lg text-xs text-green-300">
                {sermonMsg}
              </div>
            )}
            <form onSubmit={handleCreateSermon} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                    Sermon Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Awakening the Sound of Zion"
                    value={newSermonTitle}
                    onChange={(e) => setNewSermonTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                    Topic / Category
                  </label>
                  <select
                    value={newSermonTopic}
                    onChange={(e) => setNewSermonTopic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Revival">Revival</option>
                    <option value="Prayer & Warfare">Prayer & Warfare</option>
                    <option value="Holy Spirit">Holy Spirit</option>
                    <option value="Discipleship">Discipleship</option>
                    <option value="Kingdom Identity">Kingdom Identity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                  YouTube Video ID (e.g. b9L3V3lQ38A)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. b9L3V3lQ38A"
                  value={newSermonYoutubeId}
                  onChange={(e) => setNewSermonYoutubeId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
                  Sermon Description & Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of message..."
                  value={newSermonDesc}
                  onChange={(e) => setNewSermonDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <button
                type="submit"
                disabled={sermonSaving}
                className="px-6 py-2.5 rounded-lg bg-[#c5a880] text-[#0a0a0d] text-xs font-semibold hover:bg-[#e0cca9] transition-all disabled:opacity-50"
              >
                {sermonSaving ? "Saving..." : "Publish Sermon"}
              </button>
            </form>
          </div>

          {/* List of Sermons */}
          <div className="space-y-2">
            {sermons.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-xl bg-[#111119] border border-[#232332] flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] text-[#c5a880] uppercase">
                    {s.topic} · {s.duration}
                  </span>
                  <h4 className="text-sm font-semibold text-[#faf8f5]">
                    {s.title}
                  </h4>
                </div>
                <a
                  href={`/sermons/${s.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c5a880] hover:underline inline-flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SUBSCRIBERS */}
      {activeTab === "subscribers" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="serif-heading text-2xl text-[#faf8f5]">
                Ministry Subscribers
              </h3>
              <p className="text-xs text-[#9c978e]">
                Direct audience list acquired via website subscription modal and
                footer forms.
              </p>
            </div>
            <button
              onClick={exportSubscribersCsv}
              className="px-4 py-2 rounded-xl bg-[#c5a880] text-[#0a0a0d] text-xs font-semibold flex items-center gap-2 hover:bg-[#e0cca9]"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV (
              {subscribers.length})
            </button>
          </div>

          <div className="rounded-2xl border border-[#232332] overflow-hidden bg-[#111119]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161624] text-[#9c978e] border-b border-[#232332]">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Daily Devotional</th>
                  <th className="p-3.5">Newsletter</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1c28] text-[#dcd6cc]">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-medium text-[#faf8f5]">
                      {sub.name || "Anonymous"}
                    </td>
                    <td className="p-3.5 font-mono text-[#c5a880]">
                      {sub.email}
                    </td>
                    <td className="p-3.5">
                      {sub.preferences.dailyDevotional ? (
                        <span className="px-2 py-0.5 rounded bg-green-950/60 text-green-300 border border-green-800 text-[10px]">
                          Subscribed
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#6b6760]">No</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {sub.preferences.ministryNewsletter ? (
                        <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800 text-[10px]">
                          Subscribed
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#6b6760]">No</span>
                      )}
                    </td>
                    <td className="p-3.5 text-[#9c978e] capitalize">
                      {sub.source.replace("_", " ")}
                    </td>
                    <td className="p-3.5 text-[#9c978e]">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="space-y-6">
          <div>
            <h3 className="serif-heading text-2xl text-[#faf8f5]">
              Ministry Enquiries & Itinerary Requests
            </h3>
            <p className="text-xs text-[#9c978e]">
              Manage invitations to preach, conference keynotes, media
              interviews, and correspondence.
            </p>
          </div>

          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-6 rounded-2xl bg-[#111119] border border-[#232332] space-y-4 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1c1c28] pb-3">
                  <div>
                    <span className="text-xs font-semibold text-[#c5a880] uppercase tracking-wider block">
                      {enq.category.replace("_", " ")}
                    </span>
                    <h4 className="text-base font-semibold text-[#faf8f5]">
                      {enq.name}{" "}
                      {enq.organization ? `· ${enq.organization}` : ""}
                    </h4>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5">
                    {(
                      ["new", "reviewed", "responded", "archived"] as const
                    ).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(enq.id, status)}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors ${
                          enq.status === status
                            ? status === "new"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-600"
                              : status === "reviewed"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-600"
                                : status === "responded"
                                  ? "bg-green-500/20 text-green-300 border border-green-600"
                                  : "bg-zinc-700/50 text-zinc-300"
                            : "bg-[#181824] text-[#9c978e] hover:text-[#faf8f5]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#9c978e]">
                  <div>
                    Email: <span className="text-[#faf8f5]">{enq.email}</span>
                  </div>
                  {enq.phone && (
                    <div>
                      Phone: <span className="text-[#faf8f5]">{enq.phone}</span>
                    </div>
                  )}
                  {enq.eventDate && (
                    <div>
                      Proposed Date:{" "}
                      <span className="text-[#faf8f5]">{enq.eventDate}</span>
                    </div>
                  )}
                  {enq.location && (
                    <div>
                      Location:{" "}
                      <span className="text-[#faf8f5]">{enq.location}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#151522] text-xs sm:text-sm text-[#dcd6cc] leading-relaxed">
                  {enq.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SETTINGS & SEO */}
      {activeTab === "settings" && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111119] border border-[#232332] space-y-6 max-w-2xl">
          <h3 className="serif-heading text-2xl text-[#faf8f5]">
            Platform Settings & SEO Defaults
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-[#dcd6cc] mb-1">
                Official Website URL
              </label>
              <input
                type="url"
                defaultValue="https://evangelisttolucci.com"
                className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#dcd6cc] mb-1">
                Official Platform Title
              </label>
              <input
                type="text"
                defaultValue="Evangelist Tolucci | Official Website & Ministry Platform"
                className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#dcd6cc] mb-1">
                Meta Description for Search Engines (SEO)
              </label>
              <textarea
                rows={3}
                defaultValue="Official digital home and ministry platform for Evangelist Tolucci. Discover sermons, daily devotionals, music releases, books, and prophetic teachings for personal revival."
                className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#dcd6cc] mb-1">
                Ministry Contact Email
              </label>
              <input
                type="email"
                defaultValue="info@evangelisttolucci.com"
                className="w-full px-3.5 py-2 rounded-lg bg-[#161622] border border-[#2b2b3d] text-xs text-[#faf8f5]"
              />
            </div>
            <div className="pt-2">
              <button
                onClick={() => alert("Settings updated in local environment.")}
                className="px-6 py-2.5 rounded-lg bg-[#c5a880] text-[#0a0a0d] font-semibold text-xs hover:bg-[#e0cca9]"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
