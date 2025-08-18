import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';

export default function CreateNewProgramScreen() {
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView>
        <ThemedText>Create New Program Screen</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}
