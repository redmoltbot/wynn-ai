import { redis } from './redis';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const key = (sessionId: string) => `session:${sessionId}:messages`;
const MAX_STORED = 100;

export async function getHistory(sessionId: string, count = 10): Promise<Message[]> {
  const raw = await redis.lrange<Message>(key(sessionId), -count, -1);
  return raw;
}

export async function appendMessages(sessionId: string, messages: Message[]): Promise<void> {
  const pipeline = redis.pipeline();
  for (const msg of messages) {
    pipeline.rpush(key(sessionId), JSON.stringify(msg));
  }
  pipeline.ltrim(key(sessionId), -MAX_STORED, -1);
  await pipeline.exec();
}
