// constants/exercises.ts
import type {
  ExerciseLibraryItem,
  MuscleGroup
} from "../types/exercise";

export const EXERCISE_DATABASE: ExerciseLibraryItem[] = [
  // CHEST
  {
    id: "chest-1",
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "chest-2",
    name: "Incline Barbell Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "chest-3",
    name: "Dumbbell Bench Press",
    muscleGroup: "Chest",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "chest-4",
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "chest-5",
    name: "Dumbbell Flyes",
    muscleGroup: "Chest",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "chest-6",
    name: "Cable Flyes",
    muscleGroup: "Chest",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "chest-7",
    name: "Push-ups",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
  },
  {
    id: "chest-8",
    name: "Chest Dips",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
  },

  // BACK
  {
    id: "back-1",
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
  },
  {
    id: "back-2",
    name: "Barbell Rows",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "back-3",
    name: "Pull-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
  },
  {
    id: "back-4",
    name: "Chin-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
  },
  {
    id: "back-5",
    name: "Lat Pulldown",
    muscleGroup: "Back",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "back-6",
    name: "Seated Cable Rows",
    muscleGroup: "Back",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "back-7",
    name: "T-Bar Rows",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "back-8",
    name: "Face Pulls",
    muscleGroup: "Back",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "back-9",
    name: "Dumbbell Rows",
    muscleGroup: "Back",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },

  // LEGS
  {
    id: "legs-1",
    name: "Barbell Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "legs-2",
    name: "Front Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Advanced",
  },
  {
    id: "legs-3",
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "legs-4",
    name: "Leg Press",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
  },
  {
    id: "legs-5",
    name: "Leg Curls",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
  },
  {
    id: "legs-6",
    name: "Leg Extensions",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
  },
  {
    id: "legs-7",
    name: "Bulgarian Split Squat",
    muscleGroup: "Legs",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
  },
  {
    id: "legs-8",
    name: "Walking Lunges",
    muscleGroup: "Legs",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "legs-9",
    name: "Calf Raises",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
  },

  // SHOULDERS
  {
    id: "shoulders-1",
    name: "Overhead Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "shoulders-2",
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "shoulders-3",
    name: "Lateral Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "shoulders-4",
    name: "Front Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "shoulders-5",
    name: "Rear Delt Flyes",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "shoulders-6",
    name: "Arnold Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
  },
  {
    id: "shoulders-7",
    name: "Cable Lateral Raises",
    muscleGroup: "Shoulders",
    equipment: "Cable",
    difficulty: "Beginner",
  },

  // ARMS
  {
    id: "arms-1",
    name: "Barbell Curl",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Beginner",
  },
  {
    id: "arms-2",
    name: "Dumbbell Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "arms-3",
    name: "Hammer Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "arms-4",
    name: "Preacher Curls",
    muscleGroup: "Arms",
    equipment: "Machine",
    difficulty: "Beginner",
  },
  {
    id: "arms-5",
    name: "Tricep Pushdowns",
    muscleGroup: "Arms",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "arms-6",
    name: "Skull Crushers",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },
  {
    id: "arms-7",
    name: "Overhead Tricep Extension",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  {
    id: "arms-8",
    name: "Dips",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
  },
  {
    id: "arms-9",
    name: "Close-Grip Bench Press",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
  },

  // CORE
  {
    id: "core-1",
    name: "Planks",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
  },
  {
    id: "core-2",
    name: "Crunches",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
  },
  {
    id: "core-3",
    name: "Cable Crunches",
    muscleGroup: "Core",
    equipment: "Cable",
    difficulty: "Beginner",
  },
  {
    id: "core-4",
    name: "Hanging Leg Raises",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
  },
  {
    id: "core-5",
    name: "Russian Twists",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
  },
  {
    id: "core-6",
    name: "Ab Wheel Rollouts",
    muscleGroup: "Core",
    equipment: "Other",
    difficulty: "Advanced",
  },
];

export const getExercisesByMuscleGroup = (muscleGroup: MuscleGroup) => {
  return EXERCISE_DATABASE.filter((ex) => ex.muscleGroup === muscleGroup);
};

export const searchExercises = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return EXERCISE_DATABASE.filter((ex) =>
    ex.name.toLowerCase().includes(lowerQuery),
  );
};

export const getExerciseById = (id: string) => {
  return EXERCISE_DATABASE.find((ex) => ex.id === id);
};

export const MUSCLE_GROUPS: MuscleGroup[] = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
];
