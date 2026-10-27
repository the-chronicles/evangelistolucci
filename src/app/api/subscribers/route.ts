import { NextRequest, NextResponse } from 'next/server';
import { deleteSubscriber, getSubscribers } from '@/lib/storage';

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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Subscriber ID is required' }, { status: 400 });
    }
    const success = deleteSubscriber(id);
    if (success) {
      return NextResponse.json({ success: true, id });
    }
    return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
