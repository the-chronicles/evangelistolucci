import { NextRequest, NextResponse } from 'next/server';
import { getDevotionals, saveDevotional } from '@/lib/storage';
import { Devotional } from '@/types';

export async function GET() {
  const devotionals = getDevotionals();
  return NextResponse.json({ devotionals });
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Devotional;
    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const devotionalToSave: Devotional = {
      ...data,
      id: data.id || `dev-${Date.now()}`,
      slug,
      date: data.date || new Date().toISOString().split('T')[0] as string,
    };
    saveDevotional(devotionalToSave);
    return NextResponse.json({ success: true, devotional: devotionalToSave });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save devotional' }, { status: 500 });
  }
}
