import fs from 'fs';
import path from 'path';
import { Subscriber, ContactEnquiry, Devotional, Sermon, Book, MusicRelease } from '@/types';
import { initialDevotionals } from '@/data/devotionals';
import { initialSermons } from '@/data/sermons';
import { initialBooks } from '@/data/books';
import { initialMusic } from '@/data/music';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Subscribers Store
export function getSubscribers(): Subscriber[] {
  return readJsonFile<Subscriber[]>('subscribers.json', [
    {
      id: 'sub-1',
      name: 'Adewale Johnson',
      email: 'adewale.j@example.com',
      preferences: { dailyDevotional: true, ministryNewsletter: true },
      subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      source: 'first_visit_modal'
    },
    {
      id: 'sub-2',
      name: 'Grace Oladipo',
      email: 'grace.o@example.com',
      preferences: { dailyDevotional: true, ministryNewsletter: false },
      subscribedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      source: 'devotional_page'
    }
  ]);
}

export function addSubscriber(sub: Omit<Subscriber, 'id' | 'subscribedAt'>): { success: boolean; isNew: boolean; message: string } {
  const current = getSubscribers();
  const existing = current.find(s => s.email.toLowerCase() === sub.email.toLowerCase());
  
  if (existing) {
    // update preferences if already subscribed
    existing.preferences = { ...existing.preferences, ...sub.preferences };
    writeJsonFile('subscribers.json', current);
    return { success: true, isNew: false, message: 'Your subscription preferences have been updated!' };
  }

  const newSub: Subscriber = {
    ...sub,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    subscribedAt: new Date().toISOString(),
  };
  current.unshift(newSub);
  writeJsonFile('subscribers.json', current);
  return { success: true, isNew: true, message: 'You have been successfully subscribed to Evangelist Tolucci’s ministry updates!' };
}

// Contact Enquiries Store
export function getEnquiries(): ContactEnquiry[] {
  return readJsonFile<ContactEnquiry[]>('enquiries.json', [
    {
      id: 'enq-101',
      name: 'Pastor Samuel Kalu',
      email: 'pastor.samuel@revivalassembly.org',
      phone: '+234 803 123 4567',
      category: 'preach_minister',
      organization: 'Revival Assembly Church, Lagos',
      eventDate: '2026-11-15',
      location: 'Victoria Island, Lagos, Nigeria',
      message: 'Greetings in Jesus name. We would like to officially invite Evangelist Tolucci to minister at our upcoming 3-day Annual Believers Camp Meeting.',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'new'
    },
    {
      id: 'enq-102',
      name: 'Deborah Okoro',
      email: 'deborah@worshipnetwork.uk',
      phone: '+44 7700 900123',
      category: 'conference',
      organization: 'UK Kingdom Worship Collective',
      eventDate: '2026-12-05',
      location: 'London, United Kingdom',
      message: 'We are organizing the European Kingdom Sounds Summit and would love Evangelist Tolucci to keynote on prophetic worship and revival songs.',
      submittedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      status: 'reviewed'
    }
  ]);
}

export function addEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'submittedAt' | 'status'>): ContactEnquiry {
  const current = getEnquiries();
  const created: ContactEnquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };
  current.unshift(created);
  writeJsonFile('enquiries.json', current);
  return created;
}

export function updateEnquiryStatus(id: string, status: ContactEnquiry['status']): boolean {
  const current = getEnquiries();
  const target = current.find(e => e.id === id);
  if (target) {
    target.status = status;
    writeJsonFile('enquiries.json', current);
    return true;
  }
  return false;
}

// Devotionals Store
export function getDevotionals(): Devotional[] {
  return readJsonFile<Devotional[]>('devotionals.json', initialDevotionals);
}

export function saveDevotional(devotional: Devotional): void {
  const current = getDevotionals();
  const idx = current.findIndex(d => d.id === devotional.id || d.slug === devotional.slug);
  if (idx >= 0) {
    current[idx] = devotional;
  } else {
    current.unshift(devotional);
  }
  writeJsonFile('devotionals.json', current);
}

// Sermons Store
export function getSermons(): Sermon[] {
  return readJsonFile<Sermon[]>('sermons.json', initialSermons);
}

export function saveSermon(sermon: Sermon): void {
  const current = getSermons();
  const idx = current.findIndex(s => s.id === sermon.id || s.slug === sermon.slug);
  if (idx >= 0) {
    current[idx] = sermon;
  } else {
    current.unshift(sermon);
  }
  writeJsonFile('sermons.json', current);
}

// Books Store
export function getBooks(): Book[] {
  return readJsonFile<Book[]>('books.json', initialBooks);
}

// Music Store
export function getMusicReleases(): MusicRelease[] {
  return readJsonFile<MusicRelease[]>('music.json', initialMusic);
}
