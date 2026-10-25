import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/storage';

export async function GET() {
  const subscribers = getSubscribers();
  const total = subscribers.length;
  const devotionalCount = subscribers.filter(s => s.preferences.dailyDevotional).length;
  const newsletterCount = subscribers.filter(s => s.preferences.ministryNewsletter).length;

  return NextResponse.json({
    subscribers,
    stats: {
      total,
      devotionalCount,
      newsletterCount,
    },
  });
}
