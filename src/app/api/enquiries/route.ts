import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus } from '@/lib/storage';
import { ContactEnquiry } from '@/types';

export async function GET() {
  const enquiries = getEnquiries();
  const newCount = enquiries.filter(e => e.status === 'new').length;
  return NextResponse.json({
    enquiries,
    stats: {
      total: enquiries.length,
      newCount,
    },
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }
    const success = updateEnquiryStatus(id, status as ContactEnquiry['status']);
    if (success) {
      return NextResponse.json({ success: true, id, status });
    }
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
