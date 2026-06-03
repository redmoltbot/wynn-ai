export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Wynn AI',
  llmModel: process.env.NEXT_PUBLIC_LLM_MODEL || 'google/gemini-2.5-flash-lite',
  straicoApiKey: process.env.STRAICO_API_KEY,
};
