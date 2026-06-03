import { NextRequest, NextResponse } from 'next/server';
import { straicoChat } from '@/lib/straico';
import { getWynnSystemPrompt } from '@/lib/wynn-system-prompt';

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    // Keep only the last 8 messages of history before appending the new user message
    const trimmedHistory = Array.isArray(messages) ? messages.slice(-8) : [];

    const chatMessages = [
      { role: 'system' as const, content: getWynnSystemPrompt() },
      ...trimmedHistory,
      { role: 'user' as const, content: userMessage },
    ];

    const content = await straicoChat(chatMessages);

    return NextResponse.json({ role: 'assistant', content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
