// types/health.ts
export type HRVData = {
  value: number; // in milliseconds
  timestamp: string;
  source?: string;
};

export type SleepData = {
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  quality: "poor" | "fair" | "good" | "excellent";
  stages?: {
    awake?: number;
    light?: number;
    deep?: number;
    rem?: number;
  };
  source?: string;
};

export type RecoveryScore = {
  score: number; // 0-100
  hrv?: number;
  sleepHours?: number;
  sleepQuality?: string;
  recommendation: string;
  shouldReduceIntensity: boolean;
  timestamp: string;
};

export type HealthMetrics = {
  hrv: HRVData | null;
  sleep: SleepData | null;
  recoveryScore: RecoveryScore | null;
  lastUpdated: string;
};
