export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Wynn AI',
  llmModel: process.env.NEXT_PUBLIC_LLM_MODEL || 'claude-3-5-haiku-20241022',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  straicoApiKey: process.env.STRAICO_API_KEY,
};
