import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button';
import {Colors} from '@/src/constants/Colors';
import {useColorScheme} from '@/src/hooks';
import {GestureResponderEvent, View, type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
  text: string;
  variant?: Variants;
  isDisabled?: boolean;
  isPending?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

type Variants = 'main' | 'secondary' | 'ghost' | 'danger';

export function ThemedButton({ style, text, variant = 'main', isDisabled, isPending, onPress, ...otherProps}: ThemedViewProps) {
  // const colorScheme = useColorScheme();

  return (
    <Button
      className={
        variant === 'main'
          ? 'bg-green-600 dark:bg-white'
          : variant === 'secondary'
          ? 'bg-stone-900 dark:bg-white'
          : variant === 'ghost'
          ? 'bg-stone-700 dark:bg-white'
          : variant === 'danger'
          ? 'bg-red-700 dark:bg-white'
          : 'bg-green-700 dark:bg-stone-300'
      }
      isDisabled={isDisabled}
      onPress={onPress}
      style={[{borderRadius: 7},style]}
      {...otherProps}
      >
      {isPending && <ButtonSpinner />}
      <ButtonText
        className={
          variant === 'main'
            ? 'text-white dark:text-stone-900'
            : variant === 'secondary'
            ? 'text-white dark:text-stone-900'
            : variant === 'ghost'
            ? 'text-white dark:text-stone-900'
            : variant === 'danger'
            ? 'text-white dark:text-red-900'
            : 'text-white dark:text-stone-900'
        }>
        {isPending ? 'Please wait...' : text}

      </ButtonText>
    </Button>
  );
}
