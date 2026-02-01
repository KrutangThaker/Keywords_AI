// store/userStore.ts
import { create } from "zustand";
import { UserPreferences, UserProfile } from "../types";

type UserState = {
  profile: UserProfile | null;
  preferences: UserPreferences;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  preferences: {
    theme: "system",
    notifications: true,
    healthKitEnabled: false,
    measurementSystem: "imperial",
  },
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    })),
  setPreferences: (preferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...preferences },
    })),
}));
