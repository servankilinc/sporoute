import {Colors} from '@/src/constants/Colors';
import {useColorScheme} from 'nativewind';
import {StyleSheet, Text, type TextProps} from 'react-native';

export type ThemedTextProps = TextProps & {
  className?: string;
  lightColor?: string;
  darkColor?: string;
  type?: 'custom' | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({style, className, lightColor, darkColor, type = 'default', ...rest}: ThemedTextProps) {
  const {colorScheme} = useColorScheme();

  return (
    <Text
      className={className}
      style={[
        {color: colorScheme === 'dark' ? darkColor || Colors.dark.text : lightColor || Colors.light.text},
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
