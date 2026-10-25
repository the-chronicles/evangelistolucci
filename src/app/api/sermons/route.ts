import { NextRequest, NextResponse } from 'next/server';
import { getSermons, saveSermon } from '@/lib/storage';
import { Sermon } from '@/types';

export async function GET() {
  const sermons = getSermons();
  return NextResponse.json({ sermons });
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Sermon;
    if (!data.title || !data.youtubeId) {
      return NextResponse.json({ error: 'Title and YouTube ID are required' }, { status: 400 });
    }
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sermonToSave: Sermon = {
      ...data,
      id: data.id || `sermon-${Date.now()}`,
      slug,
      date: data.date || new Date().toISOString().split('T')[0] as string,
    };
    saveSermon(sermonToSave);
    return NextResponse.json({ success: true, sermon: sermonToSave });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save sermon' }, { status: 500 });
  }
}
