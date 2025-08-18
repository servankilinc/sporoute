import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({style, lightColor, darkColor, ...otherProps}: ThemedViewProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        {backgroundColor: colorScheme === 'dark' ? darkColor || Colors.dark.bodyBackground : lightColor || Colors.light.bodyBackground},
        {borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, margin: 8, borderWidth: 1, borderColor: colorScheme === 'dark' ? Colors.dark.border : Colors.light.border},
        style,
      ]}
      {...otherProps}
    />
  );
}
