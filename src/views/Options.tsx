import {ThemedText, ThemedView} from '@/src/components/global';
import {Switch} from '@/components/ui/switch';
import {useColorScheme, useSetColorScheme} from '@/src/hooks';
import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';

export default function OptionsScreen() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const setColorScheme = useSetColorScheme();
  
  const setThemeMode = (value: boolean) => {
    setColorScheme(value ? 'dark' : 'light');
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <AppLayout returnHomeEnable={true} returnbackEnable={true}>
      <ThemedView className="flex flex-row items-center justify-between p-4">
        <ThemedText className="text-xl font-bold">Dark Theme</ThemedText>
        <Switch size="lg" onValueChange={v => setThemeMode(v)} value={theme === 'dark'} />
      </ThemedView>
    </AppLayout>
  );
}
