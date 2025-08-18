import {ThemedText, ThemedView} from '@/src/components/global';
import AppLayout from '../layouts/AppLayout';

export default function ProgramsScreen() {
  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView>
        <ThemedText>Programs Screen of Tabs</ThemedText>
      </ThemedView>
    </AppLayout>
  );
}
