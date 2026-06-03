import { NextRequest, NextResponse } from 'next/server';
import { straicoChat } from '@/lib/straico';
import { getWynnSystemPrompt } from '@/lib/wynn-system-prompt';

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    const trimmedHistory = Array.isArray(messages) ? messages.slice(-8) : [];

    const content = await straicoChat(trimmedHistory, userMessage, getWynnSystemPrompt());

    return NextResponse.json({ role: 'assistant', content });
  } catch (error) {
    console.error('Chat API error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
