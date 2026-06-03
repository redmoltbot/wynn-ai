import { NextRequest, NextResponse } from 'next/server';
import { straicoChat } from '@/lib/straico';
import { getWynnSystemPrompt } from '@/lib/wynn-system-prompt';
import { getHistory, appendMessages } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userMessage } = await request.json();

    const history = sessionId ? await getHistory(sessionId, 8) : [];
    const content = await straicoChat(history, userMessage, getWynnSystemPrompt());

    if (sessionId) {
      await appendMessages(sessionId, [
        { role: 'user', content: userMessage },
        { role: 'assistant', content: content },
      ]);
    }

    return NextResponse.json({ role: 'assistant', content });
  } catch (error) {
    console.error('Chat API error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
