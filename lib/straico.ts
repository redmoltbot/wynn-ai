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

  console.log('[straico] model:', appConfig.llmModel);
  console.log('[straico] key prefix:', apiKey.slice(0, 6));

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

  console.log('[straico] status:', res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error('[straico] error body:', text);
    throw new Error(`Straico ${res.status}: ${text}`);
  }

  const data: StraicoResponse = await res.json();
  return data.choices[0].message.content;
}
