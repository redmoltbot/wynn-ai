import { appConfig } from '@/app.config';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
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

export async function straicoChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = appConfig.straicoApiKey;
  if (!apiKey) throw new Error('STRAICO_API_KEY is not set');

  const res = await fetch('https://api.straico.com/v2/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: appConfig.llmModel,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Straico API error ${res.status}: ${text}`);
  }

  const data: StraicoResponse = await res.json();
  return data.choices[0].message.content;
}
