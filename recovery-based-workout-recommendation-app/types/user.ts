// types/user.ts
export type FitnessGoal =
  | "lose-fat"
  | "build-strength"
  | "gain-muscle"
  | "get-toned"
  | "maintain"
  | "general-fitness";

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fitnessGoals: FitnessGoal[];
  onboardingComplete: boolean;
  onboardingStep?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPreferences = {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  healthKitEnabled: boolean;
  measurementSystem: "imperial" | "metric";
};
