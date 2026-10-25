import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, preferences, source } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const result = addSubscriber({
      name: name?.trim() || undefined,
      email: email.trim().toLowerCase(),
      preferences: {
        dailyDevotional: Boolean(preferences?.dailyDevotional),
        ministryNewsletter: Boolean(preferences?.ministryNewsletter),
      },
      source: source || 'first_visit_modal',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
