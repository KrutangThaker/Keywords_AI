// store/workoutStore.ts
import { create } from "zustand";
import { workoutStorage } from "../services/storage/asyncStorage";
import type { Exercise, Workout, WorkoutSet } from "../types/workout";

type WorkoutState = {
  // Active workout
  activeWorkout: Workout | null;
  isWorkoutActive: boolean;
  workoutStartTime: string | null;

  // Workout history
  workouts: Workout[];

  // Actions
  startWorkout: (name: string) => void;
  endWorkout: () => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void;
  addSet: (exerciseId: string, set: WorkoutSet) => void;
  updateSet: (
    exerciseId: string,
    setId: string,
    updates: Partial<WorkoutSet>,
  ) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  toggleSetCompletion: (exerciseId: string, setId: string) => void;
  saveWorkout: () => void;
  loadWorkouts: () => void;
};

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeWorkout: null,
  isWorkoutActive: false,
  workoutStartTime: null,
  workouts: [],

  startWorkout: (name: string) => {
    const now = new Date().toISOString();
    set({
      activeWorkout: {
        id: Date.now().toString(),
        userId: "", // Set from Clerk user
        name,
        date: now,
        startTime: now,
        exercises: [],
        isTemplate: false,
      },
      isWorkoutActive: true,
      workoutStartTime: now,
    });
  },

  endWorkout: () => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const endTime = new Date().toISOString();
    const duration =
      (new Date(endTime).getTime() -
        new Date(activeWorkout.startTime).getTime()) /
      1000;

    const totalVolume = activeWorkout.exercises.reduce((total, exercise) => {
      return (
        total +
        exercise.sets.reduce((setTotal, set) => {
          return setTotal + (set.weight || 0) * (set.reps || 0);
        }, 0)
      );
    }, 0);

    const totalSets = activeWorkout.exercises.reduce((total, exercise) => {
      return total + exercise.sets.length;
    }, 0);

    const completedWorkout: Workout = {
      ...activeWorkout,
      endTime,
      duration,
      totalVolume,
      totalSets,
    };

    set((state) => ({
      workouts: [completedWorkout, ...state.workouts],
      activeWorkout: null,
      isWorkoutActive: false,
      workoutStartTime: null,
    }));
  },

  addExercise: (exercise: Exercise) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: [...state.activeWorkout.exercises, exercise],
          }
        : null,
    }));
  },

  removeExercise: (exerciseId: string) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.filter(
              (ex) => ex.id !== exerciseId,
            ),
          }
        : null,
    }));
  },

  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.map((ex) =>
              ex.id === exerciseId ? { ...ex, ...updates } : ex,
            ),
          }
        : null,
    }));
  },

  addSet: (exerciseId: string, workoutSet: WorkoutSet) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.map((ex) =>
              ex.id === exerciseId
                ? { ...ex, sets: [...ex.sets, workoutSet] }
                : ex,
            ),
          }
        : null,
    }));
  },

  updateSet: (
    exerciseId: string,
    setId: string,
    updates: Partial<WorkoutSet>,
  ) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.map((ex) =>
              ex.id === exerciseId
                ? {
                    ...ex,
                    sets: ex.sets.map((s) =>
                      s.id === setId ? { ...s, ...updates } : s,
                    ),
                  }
                : ex,
            ),
          }
        : null,
    }));
  },

  deleteSet: (exerciseId: string, setId: string) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.map((ex) =>
              ex.id === exerciseId
                ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
                : ex,
            ),
          }
        : null,
    }));
  },

  toggleSetCompletion: (exerciseId: string, setId: string) => {
    set((state) => ({
      activeWorkout: state.activeWorkout
        ? {
            ...state.activeWorkout,
            exercises: state.activeWorkout.exercises.map((ex) =>
              ex.id === exerciseId
                ? {
                    ...ex,
                    sets: ex.sets.map((s) =>
                      s.id === setId ? { ...s, completed: !s.completed } : s,
                    ),
                  }
                : ex,
            ),
          }
        : null,
    }));
  },

  saveWorkout: async () => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const endTime = new Date().toISOString();
    const duration =
      (new Date(endTime).getTime() -
        new Date(activeWorkout.startTime).getTime()) /
      1000;

    const totalVolume = activeWorkout.exercises.reduce((total, exercise) => {
      return (
        total +
        exercise.sets.reduce((setTotal, workoutSet) => {
          return setTotal + (workoutSet.weight || 0) * (workoutSet.reps || 0);
        }, 0)
      );
    }, 0);

    const totalSets = activeWorkout.exercises.reduce((total, exercise) => {
      return total + exercise.sets.length;
    }, 0);

    const completedWorkout: Workout = {
      ...activeWorkout,
      endTime,
      duration,
      totalVolume,
      totalSets,
    };

    // Save to storage
    try {
      await workoutStorage.addWorkout(completedWorkout);

      set((state) => ({
        workouts: [completedWorkout, ...state.workouts],
        activeWorkout: null,
        isWorkoutActive: false,
        workoutStartTime: null,
      }));
    } catch (error) {
      console.error("Failed to save workout:", error);
    }
  },

  loadWorkouts: async () => {
    try {
      const workouts = await workoutStorage.getWorkouts();
      set({ workouts });
    } catch (error) {
      console.error("Failed to load workouts:", error);
    }
  },
}));
