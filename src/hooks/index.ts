import { Colors as config_Colors } from '@/src/constants/Colors';
import { DefaultTheme } from '@react-navigation/native';
import { useColorScheme as source_useColorScheme } from 'nativewind';

export function useThemeScheme(): ReactNavigation.Theme {
  const {colorScheme} = source_useColorScheme();

  if (colorScheme == 'dark') {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: config_Colors.dark.background,
      },
    };
  } else {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: config_Colors.light.background,
      },
    };
  }
}

export function useColorScheme(): 'light' | 'dark' {
  const {colorScheme} = source_useColorScheme();
  return colorScheme ?? 'light';
}

export function useSetColorScheme() {
  const {setColorScheme} = source_useColorScheme();
  return setColorScheme;
}

export function useColors() {
  const {colorScheme} = source_useColorScheme();
  return config_Colors[colorScheme ?? 'light'];
}
