// app/workout/_layout.tsx
import { Stack } from 'expo-router';

export default function WorkoutLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="new"
        options={{
          title: 'New Workout',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="active"
        options={{
          title: 'Active Workout',
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="exercise-select"
        options={{
          title: 'Select Exercise',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="suggested"
        options={{
          title: 'AI Workout',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="summary"
        options={{
          title: 'Workout Summary',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Workout Details',
        }}
      />
    </Stack>
  );
}
