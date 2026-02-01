// services/storage/asyncStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Workout } from "../../types/workout";

const WORKOUTS_KEY = "@workouts";
const WORKOUT_TEMPLATES_KEY = "@workout_templates";

export const workoutStorage = {
  // Save all workouts
  async saveWorkouts(workouts: Workout[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(workouts);
      await AsyncStorage.setItem(WORKOUTS_KEY, jsonValue);
    } catch (error) {
      console.error("Error saving workouts:", error);
      throw error;
    }
  },

  // Get all workouts
  async getWorkouts(): Promise<Workout[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(WORKOUTS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error getting workouts:", error);
      return [];
    }
  },

  // Add a single workout
  async addWorkout(workout: Workout): Promise<void> {
    try {
      const workouts = await this.getWorkouts();
      workouts.unshift(workout); // Add to beginning
      await this.saveWorkouts(workouts);
    } catch (error) {
      console.error("Error adding workout:", error);
      throw error;
    }
  },

  // Delete a workout
  async deleteWorkout(workoutId: string): Promise<void> {
    try {
      const workouts = await this.getWorkouts();
      const filtered = workouts.filter((w) => w.id !== workoutId);
      await this.saveWorkouts(filtered);
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw error;
    }
  },

  // Get workouts by date range
  async getWorkoutsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<Workout[]> {
    try {
      const workouts = await this.getWorkouts();
      return workouts.filter((w) => {
        const workoutDate = new Date(w.date);
        return (
          workoutDate >= new Date(startDate) && workoutDate <= new Date(endDate)
        );
      });
    } catch (error) {
      console.error("Error getting workouts by date range:", error);
      return [];
    }
  },

  // Clear all workouts (use with caution)
  async clearAllWorkouts(): Promise<void> {
    try {
      await AsyncStorage.removeItem(WORKOUTS_KEY);
    } catch (error) {
      console.error("Error clearing workouts:", error);
      throw error;
    }
  },
};
