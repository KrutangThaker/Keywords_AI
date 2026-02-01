// app/(tabs)/workouts.tsx (update to use store)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWorkoutStore } from '../../store/workoutStore';
import { formatDate, formatShortDuration } from '../../utils/dateHelpers';
import { formatVolume } from '../../utils/formatters';

export default function WorkoutsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { workouts, loadWorkouts } = useWorkoutStore();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderWorkoutItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => router.push(`/workout/${item.id}`)}
    >
      <View style={styles.workoutHeader}>
        <View>
          <Text style={styles.workoutName}>{item.name}</Text>
          <Text style={styles.workoutDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.volumeBadge}>
          <Text style={styles.volumeText}>{formatVolume(item.totalVolume || 0)}</Text>
          <Text style={styles.volumeLabel}>lbs</Text>
        </View>
      </View>
      <View style={styles.workoutStats}>
        <View style={styles.stat}>
          <Ionicons name="time-outline" size={16} color="#8E8E93" />
          <Text style={styles.statText}>
            {item.duration ? formatShortDuration(item.duration) : 'N/A'}
          </Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="barbell-outline" size={16} color="#8E8E93" />
          <Text style={styles.statText}>{item.exercises.length} exercises</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search workouts..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Workout List */}
      {filteredWorkouts.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={80} color="#C7C7CC" />
          <Text style={styles.emptyTitle}>No workouts yet</Text>
          <Text style={styles.emptySubtitle}>
            Start your first workout to see it here
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/workout/new')}
          >
            <Text style={styles.emptyButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/workout/new')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 24,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  workoutCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  volumeBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  volumeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  volumeLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
