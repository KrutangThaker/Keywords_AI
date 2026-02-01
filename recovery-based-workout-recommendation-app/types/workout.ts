// types/workout.ts
export type SetType = "normal" | "warmup" | "dropset" | "failure";

export type WorkoutStatus = "in_progress" | "completed" | "cancelled";

export type WorkoutSet = {
  id: string;
  setNumber: number;
  type: SetType;
  weight?: number;
  reps?: number;
  time?: number; // in seconds
  distance?: number; // in meters
  completed: boolean;
  restTime?: number; // in seconds
  notes?: string;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment?: string;
  sets: WorkoutSet[];
  notes?: string;
  videoUrl?: string;
};

export type Workout = {
  id: string;
  userId: string;
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  exercises: Exercise[];
  totalVolume?: number; // total weight lifted
  totalSets?: number;
  notes?: string;
  isTemplate: boolean;
  aiGenerated?: boolean;
  status: WorkoutStatus; // Added status field
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  days: WorkoutDay[];
  createdAt: string;
  updatedAt: string;
};

export type WorkoutDay = {
  id: string;
  name: string;
  dayOfWeek?: number; // 0-6
  exercises: Exercise[];
};
