// features/workout/hooks/useActiveWorkout.ts
import { useUser } from "@clerk/clerk-expo";
import { useWorkoutStore } from "../../../store/workoutStore";
import type { Exercise, WorkoutSet } from "../../../types/workout";

export const useActiveWorkout = () => {
  const { user } = useUser();
  const {
    activeWorkout,
    isWorkoutActive,
    workoutStartTime,
    startWorkout,
    endWorkout,
    addExercise,
    removeExercise,
    updateExercise,
    addSet,
    updateSet,
    deleteSet,
    toggleSetCompletion,
    saveWorkout,
  } = useWorkoutStore();

  const createWorkout = (name: string) => {
    startWorkout(name);
  };

  const addExerciseToWorkout = (exerciseName: string, exerciseId: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      muscleGroup: "", // Set from exercise database
      sets: [],
      notes: "",
    };
    addExercise(newExercise);
  };

  const addNewSet = (exerciseId: string, previousSet?: WorkoutSet) => {
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      setNumber:
        activeWorkout?.exercises.find((ex) => ex.id === exerciseId)?.sets
          .length || 0 + 1,
      type: "normal",
      weight: previousSet?.weight || 0,
      reps: previousSet?.reps || 0,
      completed: false,
      restTime: 90,
    };
    addSet(exerciseId, newSet);
  };

  const finishWorkout = () => {
    if (!activeWorkout || !user) return;

    // Update workout with user ID
    const updatedWorkout = {
      ...activeWorkout,
      userId: user.id,
    };

    saveWorkout();
  };

  return {
    activeWorkout,
    isWorkoutActive,
    workoutStartTime,
    createWorkout,
    endWorkout: finishWorkout,
    addExerciseToWorkout,
    removeExercise,
    updateExercise,
    addNewSet,
    updateSet,
    deleteSet,
    toggleSetCompletion,
  };
};
