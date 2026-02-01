// app/workout/exercise-select.tsx (replace entire file)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { EXERCISE_DATABASE, MUSCLE_GROUPS } from '../../constants/exercises';
import { useActiveWorkout } from '../../features/workout/hooks/useActiveWorkout';
import type { ExerciseLibraryItem, MuscleGroup } from '../../types/exercise';

export default function ExerciseSelectScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | null>(null);
  const { addExerciseToWorkout } = useActiveWorkout();

  const selectExercise = (exercise: ExerciseLibraryItem) => {
    // Add exercise to active workout
    addExerciseToWorkout(exercise.name, exercise.id);
    router.back();
  };

  const filteredExercises = () => {
    let exercises = selectedMuscleGroup
      ? EXERCISE_DATABASE.filter((ex) => ex.muscleGroup === selectedMuscleGroup)
      : EXERCISE_DATABASE;

    if (searchQuery.trim()) {
      exercises = exercises.filter((ex) =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return exercises;
  };

  const getMuscleGroupIcon = (
    muscleGroup: MuscleGroup
  ): keyof typeof Ionicons.glyphMap => {
    const icons: { [key in MuscleGroup]: keyof typeof Ionicons.glyphMap } = {
      Chest: 'body',
      Back: 'shield',
      Legs: 'walk',
      Shoulders: 'fitness',
      Arms: 'hand-right',
      Core: 'analytics',
      Cardio: 'bicycle',
      'Full Body': 'body',
    };
    return icons[muscleGroup] || 'barbell';
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>

      {/* Muscle Group Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedMuscleGroup === null && styles.filterChipActive,
          ]}
          onPress={() => setSelectedMuscleGroup(null)}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedMuscleGroup === null && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {MUSCLE_GROUPS.map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.filterChip,
              selectedMuscleGroup === group && styles.filterChipActive,
            ]}
            onPress={() => setSelectedMuscleGroup(group)}
          >
            <Ionicons
              name={getMuscleGroupIcon(group)}
              size={16}
              color={selectedMuscleGroup === group ? '#fff' : '#007AFF'}
            />
            <Text
              style={[
                styles.filterChipText,
                selectedMuscleGroup === group && styles.filterChipTextActive,
              ]}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Exercise List */}
      <FlatList
        data={filteredExercises()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() => selectExercise(item)}
          >
            <View style={styles.exerciseIconContainer}>
              <Ionicons
                name={getMuscleGroupIcon(item.muscleGroup)}
                size={24}
                color="#007AFF"
              />
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseMeta}>
                {item.muscleGroup} • {item.equipment}
              </Text>
            </View>
            <Ionicons name="add-circle" size={28} color="#007AFF" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#C7C7CC" />
            <Text style={styles.emptyText}>No exercises found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        }
      />

      {/* Create Custom Exercise Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="create-outline" size={20} color="#007AFF" />
          <Text style={styles.createButtonText}>Create Custom Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  filterScroll: {
    marginTop: 12,
    maxHeight: 44,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  exerciseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  exerciseMeta: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#C7C7CC',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
