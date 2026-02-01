// types/ai.ts
export type WorkoutIntensity = "low" | "medium" | "high";

export type AIWorkoutRecommendation = {
  intensity: WorkoutIntensity;
  explanation: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: string;
    notes?: string;
  }[];
  estimatedDuration?: number;
  estimatedVolume?: number;
};

export type PlateauDetection = {
  exerciseId: string;
  exerciseName: string;
  detected: boolean;
  weeksSinceProgress: number;
  recommendation?: string;
};
