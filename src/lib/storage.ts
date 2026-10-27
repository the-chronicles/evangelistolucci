import fs from 'fs';
import path from 'path';
import { Subscriber, ContactEnquiry, Devotional, Sermon, Book, MusicRelease } from '@/types';
import { initialDevotionals } from '@/data/devotionals';
import { initialSermons } from '@/data/sermons';
import { initialBooks } from '@/data/books';
import { initialMusic } from '@/data/music';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIBERS_REDIS_KEY = 'tolucci:subscribers';

type SubscriberResult = {
  success: boolean;
  isNew: boolean;
  message: string;
};

function getSubscriberRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url && !token) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Subscriber storage is not configured. Set the Upstash Redis environment variables.');
    }
    return null;
  }

  if (!url || !token) {
    throw new Error('Both Upstash Redis environment variables must be configured.');
  }

  return { url: url.replace(/\/+$/, ''), token };
}

async function subscriberRedisCommand<T>(command: unknown[]): Promise<T> {
  const config = getSubscriberRedisConfig();
  if (!config) {
    throw new Error('Upstash Redis is not configured.');
  }

  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(`Upstash Redis request failed: ${payload.error || response.statusText}`);
  }

  return payload.result as T;
}

function parseSubscriberRecords(records: unknown): Subscriber[] {
  if (!Array.isArray(records)) {
    throw new Error('Subscriber storage returned an invalid response.');
  }

  return records.map((record) => {
    if (typeof record !== 'string') {
      throw new Error('Subscriber storage returned an invalid record.');
    }
    return JSON.parse(record) as Subscriber;
  });
}

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
export async function getSubscribers(): Promise<Subscriber[]> {
  const config = getSubscriberRedisConfig();
  if (config) {
    return parseSubscriberRecords(
      await subscriberRedisCommand<unknown[]>(['HVALS', SUBSCRIBERS_REDIS_KEY]),
    );
  }
  return readJsonFile<Subscriber[]>('subscribers.json', []);
}

export async function addSubscriber(
  sub: Omit<Subscriber, 'id' | 'subscribedAt'>,
): Promise<SubscriberResult> {
  const config = getSubscriberRedisConfig();
  if (config) {
    const newSubscriber: Subscriber = {
      ...sub,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      subscribedAt: new Date().toISOString(),
    };
    const script = `
      local existing = redis.call('HGET', KEYS[1], ARGV[1])
      local preferences = cjson.decode(ARGV[2])
      if existing then
        local subscriber = cjson.decode(existing)
        subscriber.preferences = preferences
        redis.call('HSET', KEYS[1], ARGV[1], cjson.encode(subscriber))
        return cjson.encode({
          success = true,
          isNew = false,
          message = 'Your subscription preferences have been updated!'
        })
      end
      redis.call('HSET', KEYS[1], ARGV[1], ARGV[3])
      return cjson.encode({
        success = true,
        isNew = true,
        message = 'You have been successfully subscribed to Evangelist Tolucci’s ministry updates!'
      })
    `;
    const result = await subscriberRedisCommand<string>([
      'EVAL',
      script,
      '1',
      SUBSCRIBERS_REDIS_KEY,
      sub.email.toLowerCase(),
      JSON.stringify(sub.preferences),
      JSON.stringify(newSubscriber),
    ]);
    return JSON.parse(result) as SubscriberResult;
  }

  const current = readJsonFile<Subscriber[]>('subscribers.json', []);
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
  return readJsonFile<ContactEnquiry[]>('enquiries.json', []);
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

export function deleteEnquiry(id: string): boolean {
  const current = getEnquiries();
  const filtered = current.filter(e => e.id !== id);
  if (filtered.length === current.length) {
    return false;
  }
  writeJsonFile('enquiries.json', filtered);
  return true;
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  const config = getSubscriberRedisConfig();
  if (config) {
    const script = `
      local subscribers = redis.call('HGETALL', KEYS[1])
      for i = 1, #subscribers, 2 do
        local subscriber = cjson.decode(subscribers[i + 1])
        if subscriber.id == ARGV[1] then
          redis.call('HDEL', KEYS[1], subscribers[i])
          return 1
        end
      end
      return 0
    `;
    const deleted = await subscriberRedisCommand<number>([
      'EVAL',
      script,
      '1',
      SUBSCRIBERS_REDIS_KEY,
      id,
    ]);
    return deleted === 1;
  }

  const current = readJsonFile<Subscriber[]>('subscribers.json', []);
  const filtered = current.filter(s => s.id !== id);
  if (filtered.length === current.length) {
    return false;
  }
  writeJsonFile('subscribers.json', filtered);
  return true;
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
