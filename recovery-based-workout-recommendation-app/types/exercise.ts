// types/exercise.ts
import { WorkoutSet } from "./workout";

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Legs"
  | "Shoulders"
  | "Arms"
  | "Core"
  | "Cardio"
  | "Full Body";

export type EquipmentType =
  | "Barbell"
  | "Dumbbell"
  | "Cable"
  | "Machine"
  | "Bodyweight"
  | "Bands"
  | "Kettlebell"
  | "Other";

export type ExerciseLibraryItem = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: EquipmentType;
  description?: string;
  instructions?: string[];
  videoUrl?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  isCustom?: boolean;
};

export type ExerciseHistory = {
  exerciseId: string;
  exerciseName: string;
  date: string;
  sets: WorkoutSet[];
  personalRecord?: {
    weight: number;
    reps: number;
    date: string;
  };
};
