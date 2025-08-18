import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '@/src/layouts/AppLayout';

export default function HomeScreen() {
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView>
        <ThemedText>Home Screen</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}
