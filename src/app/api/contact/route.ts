import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry } from '@/lib/storage';
import { ContactEnquiry } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, category, organization, eventDate, location, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const newEnquiry = addEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      category: (category as ContactEnquiry['category']) || 'general',
      organization: organization?.trim(),
      eventDate: eventDate?.trim(),
      location: location?.trim(),
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to Evangelist Tolucci’s ministry. Your message has been received, and our team will prayerfully respond shortly.',
      enquiryId: newEnquiry.id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
