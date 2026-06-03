import { NextRequest, NextResponse } from 'next/server';
import { getHistory } from '@/lib/session';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json({ messages: [] });

  try {
    const messages = await getHistory(sessionId, 10);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
