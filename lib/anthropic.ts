import Anthropic from '@anthropic-ai/sdk';
import { appConfig } from '@/app.config';

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!client) {
    const apiKey = appConfig.anthropicApiKey;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
