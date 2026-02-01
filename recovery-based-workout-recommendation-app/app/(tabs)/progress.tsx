// app/(tabs)/progress.tsx
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useWorkoutStore } from '../../store/workoutStore';
import {
  calculateMuscleGroupStats,
  calculateProgressStats,
  getWeeklyRecoveryScore,
  type MuscleGroupStats,
  type ProgressStats,
} from '../../utils/progressStats';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { workouts, loadWorkouts } = useWorkoutStore();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupStats[]>([]);
  const [recoveryScore, setRecoveryScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load workouts if not already loaded
      if (workouts.length === 0 && user) {
        await loadWorkouts(user.id);
      }

      // Calculate statistics
      const progressStats = calculateProgressStats(workouts);
      const muscleGroupStats = calculateMuscleGroupStats(workouts);
      const weeklyRecovery = getWeeklyRecoveryScore(workouts);

      setStats(progressStats);
      setMuscleGroups(muscleGroupStats);
      setRecoveryScore(weeklyRecovery);
    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh when workouts change
  useEffect(() => {
    if (workouts.length > 0) {
      const progressStats = calculateProgressStats(workouts);
      const muscleGroupStats = calculateMuscleGroupStats(workouts);
      const weeklyRecovery = getWeeklyRecoveryScore(workouts);

      setStats(progressStats);
      setMuscleGroups(muscleGroupStats);
      setRecoveryScore(weeklyRecovery);
    }
  }, [workouts]);

  if (isLoading || !stats) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Ionicons name="calendar" size={28} color="#007AFF" />
          <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="barbell" size={28} color="#FF6B35" />
          <Text style={styles.statValue}>
            {stats.totalVolume >= 1000
              ? `${(stats.totalVolume / 1000).toFixed(1)}k`
              : stats.totalVolume}
          </Text>
          <Text style={styles.statLabel}>Total Volume (lbs)</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="time" size={28} color="#4CAF50" />
          <Text style={styles.statValue}>{stats.avgDuration}</Text>
          <Text style={styles.statLabel}>Avg Duration (min)</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="trophy" size={28} color="#FFD700" />
          <Text style={styles.statValue}>{stats.personalRecords}</Text>
          <Text style={styles.statLabel}>Exercises Tracked</Text>
        </View>
      </View>

      {/* Muscle Group Breakdown */}
      {muscleGroups.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Muscle Group Balance</Text>
          <View style={styles.card}>
            {muscleGroups.map((group) => (
              <View key={group.name} style={styles.muscleGroupItem}>
                <View style={styles.muscleGroupHeader}>
                  <Text style={styles.muscleGroupName}>{group.name}</Text>
                  <Text style={styles.muscleGroupSets}>{group.sets} sets</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${group.percentage}%` },
                    ]}
                  />
                </View>
                <Text style={styles.muscleGroupPercentage}>
                  {group.percentage}% • {group.volume >= 1000
                    ? `${(group.volume / 1000).toFixed(1)}k`
                    : group.volume}{' '}
                  lbs
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Muscle Group Balance</Text>
          <View style={[styles.card, styles.emptyCard]}>
            <Ionicons name="fitness-outline" size={48} color="#C7C7CC" />
            <Text style={styles.emptyText}>No workout data yet</Text>
            <Text style={styles.emptySubtext}>
              Complete workouts to see your muscle group breakdown
            </Text>
          </View>
        </View>
      )}

      {/* Weekly Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.card}>
          <View style={styles.weeklyRow}>
            <Text style={styles.weeklyLabel}>Workouts Completed</Text>
            <Text style={styles.weeklyValue}>
              {stats.weeklyWorkouts} / {stats.weeklyTarget}
            </Text>
          </View>
          <View style={styles.weeklyRow}>
            <Text style={styles.weeklyLabel}>Total Volume</Text>
            <Text style={styles.weeklyValue}>
              {stats.weeklyVolume >= 1000
                ? `${(stats.weeklyVolume / 1000).toFixed(1)}k`
                : stats.weeklyVolume}{' '}
              lbs
            </Text>
          </View>
          <View style={styles.weeklyRow}>
            <Text style={styles.weeklyLabel}>Recovery Score</Text>
            <Text
              style={[
                styles.weeklyValue,
                {
                  color:
                    recoveryScore >= 80
                      ? '#4CAF50'
                      : recoveryScore >= 60
                        ? '#FF9500'
                        : '#FF3B30',
                },
              ]}
            >
              {recoveryScore}%
            </Text>
          </View>
        </View>
      </View>

      {/* Placeholder for chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volume Trend</Text>
        <View style={[styles.card, styles.chartPlaceholder]}>
          <Ionicons name="bar-chart" size={48} color="#C7C7CC" />
          <Text style={styles.placeholderText}>Chart coming soon</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statBox: {
    width: (width - 36) / 2,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 4,
    textAlign: 'center',
  },
  muscleGroupItem: {
    marginBottom: 20,
  },
  muscleGroupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  muscleGroupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  muscleGroupSets: {
    fontSize: 14,
    color: '#8E8E93',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  muscleGroupPercentage: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'right',
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  weeklyLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  weeklyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 12,
  },
});
