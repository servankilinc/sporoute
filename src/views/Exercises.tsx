import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';

export default function ExercisesScreen() {
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView>
        <ThemedText>Exercises Screen of Tabs</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}
