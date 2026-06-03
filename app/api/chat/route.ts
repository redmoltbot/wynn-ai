import { NextRequest, NextResponse } from 'next/server';
import { getAnthropicClient } from '@/lib/anthropic';
import { getWynnSystemPrompt } from '@/lib/wynn-system-prompt';
import { appConfig } from '@/app.config';

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    const client = getAnthropicClient();

    const conversationMessages = [
      ...(messages || []),
      { role: 'user' as const, content: userMessage },
    ];

    const response = await client.messages.create({
      model: appConfig.llmModel,
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
