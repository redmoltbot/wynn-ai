export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Wynn AI',
  llmModel: process.env.NEXT_PUBLIC_LLM_MODEL || 'claude-haiku-4-5-5',
  straicoApiKey: process.env.STRAICO_API_KEY,
};
