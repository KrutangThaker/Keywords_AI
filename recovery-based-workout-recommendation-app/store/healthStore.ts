// store/healthStore.ts
import { create } from "zustand";
import { HealthMetrics, HRVData, RecoveryScore, SleepData } from "../types";

type HealthState = {
  metrics: HealthMetrics;
  setHRV: (hrv: HRVData) => void;
  setSleep: (sleep: SleepData) => void;
  setRecoveryScore: (score: RecoveryScore) => void;
  updateMetrics: (metrics: Partial<HealthMetrics>) => void;
};

export const useHealthStore = create<HealthState>((set) => ({
  metrics: {
    hrv: null,
    sleep: null,
    recoveryScore: null,
    lastUpdated: new Date().toISOString(),
  },

  setHRV: (hrv: HRVData) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        hrv,
        lastUpdated: new Date().toISOString(),
      },
    })),

  setSleep: (sleep: SleepData) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        sleep,
        lastUpdated: new Date().toISOString(),
      },
    })),

  setRecoveryScore: (recoveryScore: RecoveryScore) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        recoveryScore,
        lastUpdated: new Date().toISOString(),
      },
    })),

  updateMetrics: (updates: Partial<HealthMetrics>) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        ...updates,
        lastUpdated: new Date().toISOString(),
      },
    })),
}));
