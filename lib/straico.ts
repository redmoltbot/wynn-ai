import { appConfig } from '@/app.config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface StraicoResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export async function straicoChat(
  history: Message[],
  userMessage: string,
  systemPrompt: string
): Promise<string> {
  const apiKey = appConfig.straicoApiKey;
  if (!apiKey) throw new Error('STRAICO_API_KEY is not set');

  const allMessages: Message[] = [
    ...history,
    { role: 'user', content: userMessage },
  ];

  // claude-haiku-4-5-5 (and some other models) on Straico reject role:system.
  // Inject the system prompt inline into the first user message instead.
  const firstUserIdx = allMessages.findIndex((m) => m.role === 'user');
  if (firstUserIdx !== -1) {
    allMessages[firstUserIdx] = {
      ...allMessages[firstUserIdx],
      content: `[SYSTEM: ${systemPrompt}]\n\n${allMessages[firstUserIdx].content}`,
    };
  }

  const res = await fetch('https://api.straico.com/v0/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: appConfig.llmModel,
      messages: allMessages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Straico ${res.status}: ${text}`);
  }

  const data: StraicoResponse = await res.json();
  return data.choices[0].message.content;
}
