// utils/progressStats.ts
import type { Workout } from "../types/workout";

export type ProgressStats = {
  totalWorkouts: number;
  totalVolume: number;
  avgDuration: number;
  personalRecords: number;
  weeklyWorkouts: number;
  weeklyVolume: number;
  weeklyTarget: number;
};

export type MuscleGroupStats = {
  name: string;
  percentage: number;
  sets: number;
  volume: number;
};

export const calculateProgressStats = (workouts: Workout[]): ProgressStats => {
  const completedWorkouts = workouts.filter((w) => w.status === "completed");

  // Total workouts
  const totalWorkouts = completedWorkouts.length;

  // Total volume (weight × reps for all sets)
  const totalVolume = completedWorkouts.reduce((total, workout) => {
    const workoutVolume = (workout.exercises || []).reduce(
      (exTotal, exercise) => {
        const exerciseVolume = (exercise.sets || []).reduce((setTotal, set) => {
          if (set.completed) {
            return setTotal + (set.weight || 0) * (set.reps || 0);
          }
          return setTotal;
        }, 0);
        return exTotal + exerciseVolume;
      },
      0,
    );
    return total + workoutVolume;
  }, 0);

  // Average duration (in minutes)
  const totalDuration = completedWorkouts.reduce((total, workout) => {
    if (workout.startTime && workout.endTime) {
      const duration =
        (new Date(workout.endTime).getTime() -
          new Date(workout.startTime).getTime()) /
        1000 /
        60;
      return total + duration;
    }
    return total;
  }, 0);
  const avgDuration =
    completedWorkouts.length > 0
      ? Math.round(totalDuration / completedWorkouts.length)
      : 0;

  // Personal Records (unique exercises with max weight)
  const exercisePRs = new Map<string, number>();
  completedWorkouts.forEach((workout) => {
    (workout.exercises || []).forEach((exercise) => {
      (exercise.sets || []).forEach((set) => {
        if (set.completed && set.weight) {
          const currentMax = exercisePRs.get(exercise.name) || 0;
          if (set.weight > currentMax) {
            exercisePRs.set(exercise.name, set.weight);
          }
        }
      });
    });
  });
  const personalRecords = exercisePRs.size;

  // Weekly stats (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyWorkouts = completedWorkouts.filter(
    (w) => w.endTime && new Date(w.endTime) >= sevenDaysAgo,
  ).length;

  const weeklyVolume = completedWorkouts
    .filter((w) => w.endTime && new Date(w.endTime) >= sevenDaysAgo)
    .reduce((total, workout) => {
      const workoutVolume = (workout.exercises || []).reduce(
        (exTotal, exercise) => {
          const exerciseVolume = (exercise.sets || []).reduce(
            (setTotal, set) => {
              if (set.completed) {
                return setTotal + (set.weight || 0) * (set.reps || 0);
              }
              return setTotal;
            },
            0,
          );
          return exTotal + exerciseVolume;
        },
        0,
      );
      return total + workoutVolume;
    }, 0);

  return {
    totalWorkouts,
    totalVolume,
    avgDuration,
    personalRecords,
    weeklyWorkouts,
    weeklyVolume,
    weeklyTarget: 5, // Default weekly target
  };
};

export const calculateMuscleGroupStats = (
  workouts: Workout[],
): MuscleGroupStats[] => {
  const completedWorkouts = workouts.filter((w) => w.status === "completed");

  const muscleGroupData = new Map<string, { sets: number; volume: number }>();

  completedWorkouts.forEach((workout) => {
    (workout.exercises || []).forEach((exercise) => {
      const group = exercise.muscleGroup || "Other";
      const current = muscleGroupData.get(group) || { sets: 0, volume: 0 };

      const completedSets = exercise.sets.filter((s) => s.completed).length;
      const exerciseVolume = exercise.sets.reduce((total, set) => {
        if (set.completed) {
          return total + (set.weight || 0) * (set.reps || 0);
        }
        return total;
      }, 0);

      muscleGroupData.set(group, {
        sets: current.sets + completedSets,
        volume: current.volume + exerciseVolume,
      });
    });
  });

  // Convert to array and calculate percentages
  const muscleGroups = Array.from(muscleGroupData.entries()).map(
    ([name, data]) => ({
      name,
      sets: data.sets,
      volume: data.volume,
      percentage: 0,
    }),
  );

  // Calculate percentages based on sets
  const maxSets = Math.max(...muscleGroups.map((g) => g.sets), 1);
  muscleGroups.forEach((group) => {
    group.percentage = Math.round((group.sets / maxSets) * 100);
  });

  // Sort by sets (most trained first)
  return muscleGroups.sort((a, b) => b.sets - a.sets);
};

export const getWeeklyRecoveryScore = (workouts: Workout[]): number => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentWorkouts = workouts.filter(
    (w) =>
      w.status === "completed" &&
      w.endTime &&
      new Date(w.endTime) >= sevenDaysAgo,
  );

  if (recentWorkouts.length === 0) return 100;

  // Simple recovery score: 100 - (workouts * 5) - capped at reasonable values
  // More sophisticated calculation could consider rest days, intensity, etc.
  const workoutsThisWeek = recentWorkouts.length;
  const idealWorkouts = 4;

  if (workoutsThisWeek <= idealWorkouts) {
    return 100 - workoutsThisWeek * 5;
  } else {
    return Math.max(60, 100 - workoutsThisWeek * 8);
  }
};
