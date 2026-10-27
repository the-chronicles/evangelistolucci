"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquareText,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { initialDevotionals } from "@/data/devotionals";
import { initialSermons } from "@/data/sermons";
import { Subscriber, ContactEnquiry, Devotional, Sermon } from "@/types";

type AdminTab =
  | "overview"
  | "devotionals"
  | "sermons"
  | "subscribers"
  | "enquiries";

const navigation: { id: AdminTab; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "enquiries", label: "Enquiries", icon: MessageSquareText },
  { id: "subscribers", label: "Subscribers", icon: Users },
  { id: "devotionals", label: "Devotionals", icon: BookOpen },
  { id: "sermons", label: "Sermons", icon: Video },
];

const panelClass = "rounded-2xl border border-white/[0.08] bg-[#171513]";
const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-[#100f0e] px-3.5 py-3 text-sm text-[#f7f4ee] outline-none transition placeholder:text-[#716b63] focus:border-[#c8a97e]";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

function StatCard({
  label,
  value,
  note,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: number;
  note: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <article className={`${panelClass} p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#aaa39a]">{label}</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-[#f7f4ee]">
            {value.toLocaleString()}
          </p>
        </div>
        <span
          className={`grid size-10 place-items-center rounded-xl ${
            accent
              ? "bg-[#c8a97e]/15 text-[#c8a97e]"
              : "bg-white/[0.05] text-[#aaa39a]"
          }`}
        >
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 text-xs text-[#8c857c]">{note}</p>
    </article>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="grid min-h-52 place-items-center px-6 py-10 text-center">
      <div>
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-white/[0.05] text-[#c8a97e]">
          <Check className="size-5" />
        </span>
        <h3 className="mt-4 text-sm font-medium text-[#f7f4ee]">{title}</h3>
        <p className="mt-1.5 max-w-sm text-sm leading-6 text-[#8c857c]">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [devotionals, setDevotionals] =
    useState<Devotional[]>(initialDevotionals);
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [devTitle, setDevTitle] = useState("");
  const [devScripture, setDevScripture] = useState("");
  const [devScriptureText, setDevScriptureText] = useState("");
  const [devExcerpt, setDevExcerpt] = useState("");
  const [devContent, setDevContent] = useState("");
  const [devPrayer, setDevPrayer] = useState("");
  const [devSaving, setDevSaving] = useState(false);
  const [devMessage, setDevMessage] = useState("");

  const [sermonTitle, setSermonTitle] = useState("");
  const [sermonTopic, setSermonTopic] = useState("Revival");
  const [sermonYoutubeId, setSermonYoutubeId] = useState("");
  const [sermonDescription, setSermonDescription] = useState("");
  const [sermonSaving, setSermonSaving] = useState(false);
  const [sermonMessage, setSermonMessage] = useState("");

  const newEnquiryCount = useMemo(
    () => enquiries.filter((enquiry) => enquiry.status === "new").length,
    [enquiries],
  );
  const recentEnquiries = enquiries.slice(0, 5);
  const recentSubscribers = subscribers.slice(0, 5);

  useEffect(() => {
    if (!sessionStorage.getItem("tolucci_admin_authenticated")) {
      router.push("/admin/login");
      return;
    }
    void fetchData();
  }, [router]);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const [subscribersResponse, enquiriesResponse] = await Promise.all([
        fetch("/api/subscribers"),
        fetch("/api/enquiries"),
      ]);
      if (!subscribersResponse.ok || !enquiriesResponse.ok) {
        throw new Error("The dashboard data could not be loaded.");
      }
      const [subscriberData, enquiryData] = await Promise.all([
        subscribersResponse.json(),
        enquiriesResponse.json(),
      ]);
      setSubscribers(subscriberData.subscribers ?? []);
      setEnquiries(enquiryData.enquiries ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "The dashboard data could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(
    enquiryId: string,
    status: ContactEnquiry["status"],
  ) {
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId, status }),
      });
      if (!response.ok) {
        throw new Error("This enquiry status could not be updated.");
      }
      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === enquiryId ? { ...enquiry, status } : enquiry,
        ),
      );
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "This enquiry status could not be updated.",
      );
    }
  }

  async function handleDeleteEnquiry(enquiryId: string) {
    if (!window.confirm("Delete this enquiry? This cannot be undone.")) {
      return;
    }
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: enquiryId }),
      });
      if (!response.ok) {
        throw new Error("This enquiry could not be deleted.");
      }
      setEnquiries((current) =>
        current.filter((enquiry) => enquiry.id !== enquiryId),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "This enquiry could not be deleted.",
      );
    }
  }

  async function handleDeleteSubscriber(subscriberId: string) {
    setError("");
    try {
      const response = await fetch("/api/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: subscriberId }),
      });
      if (!response.ok) {
        throw new Error("This subscriber could not be deleted.");
      }
      setSubscribers((current) =>
        current.filter((subscriber) => subscriber.id !== subscriberId),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "This subscriber could not be deleted.",
      );
    }
  }

  async function handleCreateDevotional(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDevSaving(true);
    setDevMessage("");
    const slug = devTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const devotional: Devotional = {
      id: `dev-${Date.now()}`,
      slug,
      title: devTitle,
      date: new Date().toISOString().slice(0, 10),
      scriptureReference: devScripture,
      scriptureText: devScriptureText,
      excerpt: devExcerpt || devContent.slice(0, 140),
      content: devContent.split(/\n\s*\n/).filter(Boolean),
      reflectionQuestions: [],
      prayer: devPrayer,
      tags: [],
      author: "Evangelist Tolucci",
      readingTimeMinutes: Math.max(
        1,
        Math.ceil(devContent.split(/\s+/).length / 200),
      ),
    };

    try {
      const response = await fetch("/api/devotionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(devotional),
      });
      if (!response.ok) {
        throw new Error("The devotional could not be published.");
      }
      setDevotionals((current) => [devotional, ...current]);
      setDevMessage("Devotional published.");
      setDevTitle("");
      setDevScripture("");
      setDevScriptureText("");
      setDevExcerpt("");
      setDevContent("");
      setDevPrayer("");
    } catch (saveError) {
      setDevMessage(
        saveError instanceof Error
          ? saveError.message
          : "The devotional could not be published.",
      );
    } finally {
      setDevSaving(false);
    }
  }

  async function handleCreateSermon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSermonSaving(true);
    setSermonMessage("");
    const slug = sermonTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const sermon: Sermon = {
      id: `sermon-${Date.now()}`,
      slug,
      title: sermonTitle,
      date: new Date().toISOString().slice(0, 10),
      topic: sermonTopic,
      scriptureReferences: [],
      description: sermonDescription,
      youtubeId: sermonYoutubeId,
      duration: "",
      thumbnailUrl: `https://img.youtube.com/vi/${encodeURIComponent(sermonYoutubeId)}/hqdefault.jpg`,
    };

    try {
      const response = await fetch("/api/sermons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sermon),
      });
      if (!response.ok) {
        throw new Error("The sermon could not be published.");
      }
      setSermons((current) => [sermon, ...current]);
      setSermonMessage("Sermon published.");
      setSermonTitle("");
      setSermonYoutubeId("");
      setSermonDescription("");
    } catch (saveError) {
      setSermonMessage(
        saveError instanceof Error
          ? saveError.message
          : "The sermon could not be published.",
      );
    } finally {
      setSermonSaving(false);
    }
  }

  function exportSubscribersCsv() {
    const escapeCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const headers = [
      "ID",
      "Name",
      "Email",
      "Daily Devotional",
      "Ministry Newsletter",
      "Subscribed At",
      "Source",
    ];
    const rows = subscribers.map((subscriber) =>
      [
        subscriber.id,
        subscriber.name ?? "",
        subscriber.email,
        String(subscriber.preferences.dailyDevotional),
        String(subscriber.preferences.ministryNewsletter),
        subscriber.subscribedAt,
        subscriber.source,
      ]
        .map(escapeCsv)
        .join(","),
    );
    const url = URL.createObjectURL(
      new Blob([[headers.map(escapeCsv).join(","), ...rows].join("\n")], {
        type: "text/csv;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `tolucci-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleLogout() {
    sessionStorage.removeItem("tolucci_admin_authenticated");
    router.push("/admin/login");
  }

  const pageTitles: Record<AdminTab, string> = {
    overview: "Overview",
    enquiries: "Enquiries",
    subscribers: "Subscribers",
    devotionals: "Devotionals",
    sermons: "Sermons",
  };

  return (
    <div className="min-h-screen bg-[#100f0e] text-[#f7f4ee]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/[0.08] bg-[#151311] px-5 py-6 md:flex">
        <a href="/admin" className="flex items-center gap-3 px-2">
          {/* <span className="grid size-10 place-items-center rounded-xl bg-[#c8a97e]/15 text-[#c8a97e]">
            <ShieldCheck className="size-5" />
          </span> */}
          <span>
            <span className="block text-sm font-semibold">
              Evangelist Tolucci's Ministry
            </span>
            <span className="mt-0.5 block text-xs text-[#8c857c]">
              Admin workspace
            </span>
          </span>
        </a>

        <p className="mb-3 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716b63]">
          Workspace
        </p>
        <nav className="space-y-1">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                activeTab === id
                  ? "bg-[#c8a97e]/12 font-medium text-[#dec49d]"
                  : "text-[#aaa39a] hover:bg-white/[0.04] hover:text-[#f7f4ee]"
              }`}
            >
              <Icon className="size-4" />
              <span className="flex-1">{label}</span>
              {id === "enquiries" && newEnquiryCount > 0 && (
                <span className="rounded-full bg-[#c8a97e] px-2 py-0.5 text-[10px] font-semibold text-[#100f0e]">
                  {newEnquiryCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <a
          href="https://da42.host-ww.net/roundcube/?_task=mail&_mbox=INBOX"
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#aaa39a] transition hover:bg-white/[0.04] hover:text-[#f7f4ee]"
        >
          <Mail className="size-4" />
          <span className="flex-1">Open mail</span>
          <ArrowUpRight className="size-3.5" />
        </a>

        <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-xs font-medium text-[#f7f4ee]">
            Ministry platform
          </p>
          <p className="mt-1 text-xs leading-5 text-[#8c857c]">
            Manage messages, audience and published content in one place.
          </p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#c8a97e] hover:text-[#dec49d]"
          >
            View website <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#100f0e]/95 px-4 py-4 backdrop-blur sm:px-7 lg:px-10">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#c8a97e]/15 text-[#c8a97e] md:hidden">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <p className="text-xs text-[#8c857c]">Ministry workspace</p>
                <h1 className="mt-0.5 text-lg font-semibold tracking-tight">
                  {pageTitles[activeTab]}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => void fetchData()}
                disabled={loading}
                aria-label="Refresh dashboard data"
                className="grid size-10 place-items-center rounded-xl border border-white/[0.1] text-[#aaa39a] transition hover:border-[#c8a97e]/50 hover:text-[#f7f4ee] disabled:opacity-50"
              >
                <RefreshCw
                  className={`size-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={handleLogout}
                className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.1] px-3 text-sm text-[#aaa39a] transition hover:border-red-400/40 hover:text-red-300"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b border-white/[0.06] px-4 py-3 md:hidden">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                activeTab === id
                  ? "bg-[#c8a97e] font-semibold text-[#100f0e]"
                  : "bg-white/[0.04] text-[#aaa39a]"
              }`}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </nav>

        <main className="mx-auto max-w-[1440px] space-y-7 px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          {error && (
            <div
              role="alert"
              className="flex items-center justify-between gap-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200"
            >
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                aria-label="Dismiss error"
                className="text-red-200/70 hover:text-red-100"
              >
                ×
              </button>
            </div>
          )}

          {activeTab === "overview" && (
            <>
              <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm text-[#c8a97e]">Good to see you</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Ministry at a glance
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8c857c]">
                    Review incoming messages, keep up with your audience and
                    manage published resources.
                  </p>
                </div>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.1] px-4 text-sm text-[#d8d1c7] transition hover:border-[#c8a97e]/50"
                >
                  Open public site <ArrowUpRight className="size-4" />
                </a>
              </section>

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Subscribers"
                  value={subscribers.length}
                  note="People following ministry updates"
                  icon={Users}
                  accent
                />
                <StatCard
                  label="New enquiries"
                  value={newEnquiryCount}
                  note={`${enquiries.length} total messages received`}
                  icon={MessageSquareText}
                />
                <StatCard
                  label="Devotionals"
                  value={devotionals.length}
                  note="Available in the devotional archive"
                  icon={BookOpen}
                />
                <StatCard
                  label="Sermons"
                  value={sermons.length}
                  note="Available in the sermon library"
                  icon={Video}
                />
              </section>

              <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
                <article className={`${panelClass} overflow-hidden`}>
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Recent enquiries
                      </h3>
                      <p className="mt-1 text-xs text-[#8c857c]">
                        The latest messages from the contact form
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("enquiries")}
                      className="text-xs text-[#c8a97e] hover:text-[#dec49d]"
                    >
                      View all
                    </button>
                  </div>
                  {loading ? (
                    <p className="px-6 py-10 text-center text-sm text-[#8c857c]">
                      Loading enquiries…
                    </p>
                  ) : recentEnquiries.length ? (
                    <div className="divide-y divide-white/[0.06]">
                      {recentEnquiries.map((enquiry) => (
                        <div
                          key={enquiry.id}
                          className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {enquiry.name}
                              {enquiry.organization
                                ? ` · ${enquiry.organization}`
                                : ""}
                            </p>
                            <p className="mt-1 truncate text-xs text-[#8c857c]">
                              {enquiry.message}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] capitalize ${
                                enquiry.status === "new"
                                  ? "bg-[#c8a97e]/15 text-[#dec49d]"
                                  : "bg-white/[0.06] text-[#aaa39a]"
                              }`}
                            >
                              {enquiry.status}
                            </span>
                            <span className="text-xs text-[#8c857c]">
                              {formatDate(enquiry.submittedAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No enquiries yet"
                      detail="New messages submitted through the website will appear here."
                    />
                  )}
                </article>

                <article className={`${panelClass} overflow-hidden`}>
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Recent subscribers
                      </h3>
                      <p className="mt-1 text-xs text-[#8c857c]">
                        Latest audience sign-ups
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("subscribers")}
                      className="text-xs text-[#c8a97e] hover:text-[#dec49d]"
                    >
                      View all
                    </button>
                  </div>
                  {loading ? (
                    <p className="px-6 py-10 text-center text-sm text-[#8c857c]">
                      Loading subscribers…
                    </p>
                  ) : recentSubscribers.length ? (
                    <div className="divide-y divide-white/[0.06]">
                      {recentSubscribers.map((subscriber) => (
                        <div
                          key={subscriber.id}
                          className="flex items-center gap-3 px-5 py-4 sm:px-6"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c8a97e]/10 text-xs font-semibold text-[#c8a97e]">
                            {(subscriber.name || subscriber.email)
                              .slice(0, 1)
                              .toUpperCase()}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {subscriber.name || "Unnamed subscriber"}
                            </p>
                            <p className="truncate text-xs text-[#8c857c]">
                              {subscriber.email}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-[#8c857c]">
                            {formatDate(subscriber.subscribedAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No subscribers yet"
                      detail="When someone signs up for ministry updates, they will be listed here."
                    />
                  )}
                </article>
              </section>

              <section>
                <div className="mb-3">
                  <h3 className="text-sm font-semibold">Quick actions</h3>
                  <p className="mt-1 text-xs text-[#8c857c]">
                    Create and manage resources for the ministry website
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "devotionals",
                        title: "Write a devotional",
                        detail: "Publish a new reading to the archive",
                        icon: BookOpen,
                      },
                      {
                        id: "sermons",
                        title: "Add a sermon",
                        detail: "Share a new video teaching",
                        icon: Video,
                      },
                    ] as const
                  ).map(({ id, title, detail, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`${panelClass} flex items-center gap-4 p-5 text-left transition hover:border-[#c8a97e]/40`}
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-[#c8a97e]/12 text-[#c8a97e]">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium">
                          {title}
                        </span>
                        <span className="mt-1 block text-xs text-[#8c857c]">
                          {detail}
                        </span>
                      </span>
                      <Plus className="size-4 text-[#8c857c]" />
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "enquiries" && (
            <section className="space-y-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-xl font-semibold">Contact inbox</h2>
                  <p className="mt-1 text-sm text-[#8c857c]">
                    Invitations, event requests and messages submitted on the
                    site.
                  </p>
                </div>
                <p className="text-xs text-[#8c857c]">
                  {enquiries.length}{" "}
                  {enquiries.length === 1 ? "message" : "messages"}
                </p>
              </div>
              {loading ? (
                <div
                  className={`${panelClass} py-12 text-center text-sm text-[#8c857c]`}
                >
                  Loading enquiries…
                </div>
              ) : enquiries.length ? (
                <div className="space-y-3">
                  {enquiries.map((enquiry) => (
                    <article
                      key={enquiry.id}
                      className={`${panelClass} p-5 sm:p-6`}
                    >
                      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold">
                              {enquiry.name}
                            </h3>
                            <span className="rounded-full bg-[#c8a97e]/10 px-2.5 py-1 text-[10px] capitalize text-[#dec49d]">
                              {enquiry.category.replaceAll("_", " ")}
                            </span>
                          </div>
                          {enquiry.organization && (
                            <p className="mt-1 text-sm text-[#aaa39a]">
                              {enquiry.organization}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="relative">
                            <span className="sr-only">Enquiry status</span>
                            <select
                              value={enquiry.status}
                              onChange={(event) =>
                                void handleStatusChange(
                                  enquiry.id,
                                  event.target
                                    .value as ContactEnquiry["status"],
                                )
                              }
                              className="appearance-none rounded-lg border border-white/[0.1] bg-[#100f0e] py-2 pl-3 pr-9 text-xs capitalize text-[#d8d1c7] outline-none focus:border-[#c8a97e]"
                            >
                              {(
                                [
                                  "new",
                                  "reviewed",
                                  "responded",
                                  "archived",
                                ] as const
                              ).map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 size-3.5 text-[#8c857c]" />
                          </label>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#aaa39a]">
                          <span className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                void handleStatusChange(enquiry.id, "responded")
                              }
                              aria-label={`Mark ${enquiry.name}'s enquiry as responded`}
                              title="Mark as responded"
                              className="grid size-7 place-items-center rounded-lg border border-emerald-400/25 bg-emerald-400/5 text-emerald-300 transition hover:border-emerald-400/50 hover:bg-emerald-400/10"
                            >
                              <Check className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void handleDeleteEnquiry(enquiry.id)
                              }
                              aria-label={`Delete ${enquiry.name}'s enquiry`}
                              title="Delete enquiry"
                              className="grid size-7 place-items-center rounded-lg border border-red-400/25 bg-red-500/5 text-red-200 transition hover:border-red-400/50 hover:bg-red-500/10"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                            <Mail className="size-3.5 text-[#c8a97e]" />
                            {enquiry.email}
                          </span>
                          {enquiry.eventDate && (
                            <span className="inline-flex items-center gap-2">
                              <CalendarDays className="size-3.5 text-[#c8a97e]" />
                              {enquiry.eventDate}
                            </span>
                          )}
                          {enquiry.location && (
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="size-3.5 text-[#c8a97e]" />
                              {enquiry.location}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2">
                            <Clock3 className="size-3.5 text-[#c8a97e]" />
                            {formatDate(enquiry.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <p className="rounded-xl bg-white/[0.03] p-4 text-sm leading-6 text-[#d8d1c7]">
                        {enquiry.message}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={`${panelClass}`}>
                  <EmptyState
                    title="Your inbox is clear"
                    detail="New enquiries from the website will appear here."
                  />
                </div>
              )}
            </section>
          )}

          {activeTab === "subscribers" && (
            <section className="space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-xl font-semibold">Audience</h2>
                  <p className="mt-1 text-sm text-[#8c857c]">
                    Manage people subscribed to ministry updates.
                  </p>
                </div>
                <button
                  onClick={exportSubscribersCsv}
                  disabled={!subscribers.length}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#c8a97e] px-4 text-sm font-medium text-[#100f0e] transition hover:bg-[#dec49d] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowDownToLine className="size-4" />
                  Export CSV
                </button>
              </div>
              <div className={`${panelClass} overflow-hidden`}>
                {loading ? (
                  <p className="py-12 text-center text-sm text-[#8c857c]">
                    Loading subscribers…
                  </p>
                ) : subscribers.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                      <thead className="border-b border-white/[0.08] bg-white/[0.025] text-xs text-[#8c857c]">
                        <tr>
                          <th className="px-5 py-4 font-medium">Subscriber</th>
                          <th className="px-5 py-4 font-medium">Preferences</th>
                          <th className="px-5 py-4 font-medium">Source</th>
                          <th className="px-5 py-4 font-medium">Joined</th>
                          <th className="px-5 py-4 text-right font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id}>
                            <td className="px-5 py-4">
                              <p className="font-medium">
                                {subscriber.name || "Unnamed subscriber"}
                              </p>
                              <a
                                href={`mailto:${subscriber.email}`}
                                className="mt-1 inline-block text-xs text-[#aaa39a] hover:text-[#dec49d]"
                              >
                                {subscriber.email}
                              </a>
                            </td>
                            <td className="px-5 py-4 text-xs text-[#aaa39a]">
                              {[
                                subscriber.preferences.dailyDevotional &&
                                  "Daily devotional",
                                subscriber.preferences.ministryNewsletter &&
                                  "Newsletter",
                              ]
                                .filter(Boolean)
                                .join(" · ") || "No preferences selected"}
                            </td>
                            <td className="px-5 py-4 text-xs capitalize text-[#aaa39a]">
                              {subscriber.source.replaceAll("_", " ")}
                            </td>
                            <td className="px-5 py-4 text-xs text-[#aaa39a]">
                              {formatDate(subscriber.subscribedAt)}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  void handleDeleteSubscriber(subscriber.id)
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/25 bg-red-500/5 px-2.5 py-2 text-[10px] font-medium text-red-200 transition hover:border-red-400/40 hover:bg-red-500/10"
                              >
                                <Trash2 className="size-3.5" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState
                    title="No subscribers yet"
                    detail="New sign-ups will appear here once visitors subscribe to ministry updates."
                  />
                )}
              </div>
            </section>
          )}

          {activeTab === "devotionals" && (
            <section className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className={`${panelClass} p-5 sm:p-6`}>
                <h2 className="text-lg font-semibold">Publish a devotional</h2>
                <p className="mt-1 text-sm text-[#8c857c]">
                  Add a new reading to the public devotional archive.
                </p>
                {devMessage && (
                  <p
                    role="status"
                    className="mt-4 rounded-lg border border-[#c8a97e]/20 bg-[#c8a97e]/[0.07] px-3 py-2 text-sm text-[#dec49d]"
                  >
                    {devMessage}
                  </p>
                )}
                <form
                  onSubmit={handleCreateDevotional}
                  className="mt-5 space-y-4"
                >
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Title
                    <input
                      required
                      value={devTitle}
                      onChange={(event) => setDevTitle(event.target.value)}
                      className={inputClass}
                      placeholder="A title for today’s reading"
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Scripture reference
                    <input
                      required
                      value={devScripture}
                      onChange={(event) => setDevScripture(event.target.value)}
                      className={inputClass}
                      placeholder="e.g. Psalm 27:1"
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Scripture text
                    <textarea
                      required
                      rows={2}
                      value={devScriptureText}
                      onChange={(event) =>
                        setDevScriptureText(event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Short summary
                    <textarea
                      rows={2}
                      value={devExcerpt}
                      onChange={(event) => setDevExcerpt(event.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Reading
                    <textarea
                      required
                      rows={6}
                      value={devContent}
                      onChange={(event) => setDevContent(event.target.value)}
                      className={inputClass}
                      placeholder="Separate paragraphs with a blank line."
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Closing prayer
                    <textarea
                      required
                      rows={3}
                      value={devPrayer}
                      onChange={(event) => setDevPrayer(event.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <button
                    disabled={devSaving}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#c8a97e] px-4 text-sm font-semibold text-[#100f0e] transition hover:bg-[#dec49d] disabled:opacity-50"
                  >
                    <Plus className="size-4" />
                    {devSaving ? "Publishing…" : "Publish devotional"}
                  </button>
                </form>
              </div>
              <div className={`${panelClass} overflow-hidden`}>
                <div className="border-b border-white/[0.07] px-5 py-4">
                  <h3 className="text-sm font-semibold">
                    Published devotionals
                  </h3>
                  <p className="mt-1 text-xs text-[#8c857c]">
                    {devotionals.length} in the archive
                  </p>
                </div>
                {devotionals.length ? (
                  <div className="divide-y divide-white/[0.06]">
                    {devotionals.map((devotional) => (
                      <div
                        key={devotional.id}
                        className="flex items-center justify-between gap-3 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {devotional.title}
                          </p>
                          <p className="mt-1 text-xs text-[#8c857c]">
                            {formatDate(devotional.date)} ·{" "}
                            {devotional.scriptureReference}
                          </p>
                        </div>
                        <a
                          href={`/devotional/${devotional.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${devotional.title}`}
                          className="text-[#c8a97e] hover:text-[#dec49d]"
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No devotionals published"
                    detail="Your published readings will be listed here."
                  />
                )}
              </div>
            </section>
          )}

          {activeTab === "sermons" && (
            <section className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className={`${panelClass} p-5 sm:p-6`}>
                <h2 className="text-lg font-semibold">Add a sermon</h2>
                <p className="mt-1 text-sm text-[#8c857c]">
                  Publish a video teaching to the sermon library.
                </p>
                {sermonMessage && (
                  <p
                    role="status"
                    className="mt-4 rounded-lg border border-[#c8a97e]/20 bg-[#c8a97e]/[0.07] px-3 py-2 text-sm text-[#dec49d]"
                  >
                    {sermonMessage}
                  </p>
                )}
                <form onSubmit={handleCreateSermon} className="mt-5 space-y-4">
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Sermon title
                    <input
                      required
                      value={sermonTitle}
                      onChange={(event) => setSermonTitle(event.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Topic
                    <select
                      value={sermonTopic}
                      onChange={(event) => setSermonTopic(event.target.value)}
                      className={inputClass}
                    >
                      <option>Revival</option>
                      <option>Prayer &amp; Warfare</option>
                      <option>Holy Spirit</option>
                      <option>Discipleship</option>
                      <option>Kingdom Identity</option>
                    </select>
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    YouTube video ID
                    <input
                      required
                      value={sermonYoutubeId}
                      onChange={(event) =>
                        setSermonYoutubeId(event.target.value)
                      }
                      className={inputClass}
                      placeholder="e.g. b9L3V3lQ38A"
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs text-[#aaa39a]">
                    Description
                    <textarea
                      rows={4}
                      value={sermonDescription}
                      onChange={(event) =>
                        setSermonDescription(event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <button
                    disabled={sermonSaving}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#c8a97e] px-4 text-sm font-semibold text-[#100f0e] transition hover:bg-[#dec49d] disabled:opacity-50"
                  >
                    <Plus className="size-4" />
                    {sermonSaving ? "Publishing…" : "Publish sermon"}
                  </button>
                </form>
              </div>
              <div className={`${panelClass} overflow-hidden`}>
                <div className="border-b border-white/[0.07] px-5 py-4">
                  <h3 className="text-sm font-semibold">Published sermons</h3>
                  <p className="mt-1 text-xs text-[#8c857c]">
                    {sermons.length} in the library
                  </p>
                </div>
                {sermons.length ? (
                  <div className="divide-y divide-white/[0.06]">
                    {sermons.map((sermon) => (
                      <div
                        key={sermon.id}
                        className="flex items-center justify-between gap-3 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {sermon.title}
                          </p>
                          <p className="mt-1 text-xs text-[#8c857c]">
                            {formatDate(sermon.date)} · {sermon.topic}
                          </p>
                        </div>
                        <a
                          href={`/sermons/${sermon.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${sermon.title}`}
                          className="text-[#c8a97e] hover:text-[#dec49d]"
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No sermons published"
                    detail="Your published teachings will be listed here."
                  />
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
