export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Wynn AI',
  llmModel: process.env.NEXT_PUBLIC_LLM_MODEL || 'anthropic/claude-3-5-haiku-20241022',
  straicoApiKey: process.env.STRAICO_API_KEY,
};
