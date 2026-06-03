import { NextRequest, NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/anthropic';
import { getWynnSystemPrompt } from '@/lib/wynn-system-prompt';
import { appConfig } from '@/app.config';

// Strip optional "provider/" prefix (e.g. "anthropic/claude-3-5-haiku" → "claude-3-5-haiku")
function resolveModel(model: string): string {
  const slash = model.indexOf('/');
  return slash !== -1 ? model.slice(slash + 1) : model;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    const client = getAnthropicClient();

    // Keep only the last 8 messages of history before appending the new user message
    const trimmedHistory = Array.isArray(messages) ? messages.slice(-8) : [];

    const conversationMessages = [
      ...trimmedHistory,
      { role: 'user' as const, content: userMessage },
    ];

    const response = await client.messages.create({
      model: resolveModel(appConfig.llmModel),
      max_tokens: 256,
      system: getWynnSystemPrompt(),
      messages: conversationMessages,
    });

    const block = response.content[0];
    if (block.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    return NextResponse.json({ role: 'assistant', content: block.text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
