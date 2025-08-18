import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';

export default function AddNewExerciseScreen() {
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView>
        <ThemedText>Add New Exercise Screen</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}
