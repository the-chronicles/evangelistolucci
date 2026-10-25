export interface Devotional {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date format YYYY-MM-DD
  scriptureReference: string;
  scriptureText: string;
  excerpt: string;
  content: string[]; // paragraphs
  reflectionQuestions: string[];
  prayer: string;
  tags: string[];
  author: string;
  readingTimeMinutes: number;
}

export interface Sermon {
  id: string;
  slug: string;
  title: string;
  date: string;
  series?: string;
  topic: string;
  scriptureReferences: string[];
  description: string;
  notes?: string[];
  keyPoints?: string[];
  youtubeId: string;
  duration: string;
  thumbnailUrl: string;
  audioUrl?: string;
  downloadUrl?: string;
  transcript?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  coverImage: string;
  description: string;
  centralThemes: string[];
  targetAudience: string;
  keyTakeaways: string[];
  purchaseLinks?: { label: string; url: string }[];
  formats: {
    paperback?: { available: boolean; price?: string; buyUrl: string };
    hardcover?: { available: boolean; price?: string; buyUrl: string };
    ebook?: { available: boolean; price?: string; buyUrl: string };
  };
  sampleExcerpt?: {
    chapterTitle: string;
    text: string[];
  };
  relatedSermonSlugs?: string[];
  pages?: number;
  isbn?: string;
  publishedYear: number;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  featuredArtist?: string;
  lyrics?: string;
  audioUrl?: string; // playable preview
  appleMusicUrl?: string;
}

export interface MusicRelease {
  id: string;
  slug: string;
  title: string;
  type: "album" | "ep" | "single" | "live-experience";
  releaseYear: number;
  coverArt: string;
  description: string;
  tracks: Track[];
  featuredVideoYoutubeId?: string;
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtubeMusic?: string;
    audiomack?: string;
    boomplay?: string;
  };
  credits: string[];
}

export interface Subscriber {
  id: string;
  name?: string;
  email: string;
  preferences: {
    dailyDevotional: boolean;
    ministryNewsletter: boolean;
  };
  subscribedAt: string;
  ipHash?: string;
  source: "first_visit_modal" | "footer" | "devotional_page";
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category:
    | "general"
    | "preach_minister"
    | "conference"
    | "media"
    | "book_music"
    | "partnership";
  organization?: string;
  eventDate?: string;
  location?: string;
  message: string;
  submittedAt: string;
  status: "new" | "reviewed" | "responded" | "archived";
}

export interface ActiveTrack {
  id: string;
  title: string;
  artist: string;
  albumTitle?: string;
  coverArt: string;
  audioUrl: string;
  duration?: string;
}
