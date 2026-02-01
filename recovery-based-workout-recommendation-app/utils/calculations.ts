// utils/calculations.ts
import type { WorkoutSet } from "../types/workout";

export const calculateTotalVolume = (sets: WorkoutSet[]): number => {
  return sets.reduce((total, set) => {
    const weight = set.weight || 0;
    const reps = set.reps || 0;
    return total + weight * reps;
  }, 0);
};

export const calculateOneRepMax = (weight: number, reps: number): number => {
  // Epley Formula: 1RM = weight × (1 + reps/30)
  if (reps === 0) return weight;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
};

export const calculateEstimatedWeight = (
  oneRepMax: number,
  targetReps: number,
): number => {
  // Reverse of Epley formula
  if (targetReps === 1) return oneRepMax;
  return Math.round(oneRepMax / (1 + targetReps / 30));
};

export const calculateWorkoutIntensity = (
  currentVolume: number,
  averageVolume: number,
): "low" | "medium" | "high" => {
  const ratio = currentVolume / averageVolume;
  if (ratio < 0.8) return "low";
  if (ratio > 1.2) return "high";
  return "medium";
};
