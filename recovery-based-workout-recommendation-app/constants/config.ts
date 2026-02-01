// constants/config.ts
export const config = {
  clerk: {
    publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  },
  keywordsAI: {
    apiKey: process.env.EXPO_PUBLIC_KEYWORDS_AI_API_KEY || "",
    baseURL: "https://api.keywordsai.co/api/",
  },
  app: {
    name: "SenseFit",
    version: "1.0.0",
  },
  defaults: {
    restTime: 90, // seconds
    workoutDaysPerWeek: 3,
  },
};
