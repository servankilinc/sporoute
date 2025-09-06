import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button';
import {GestureResponderEvent, type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
  text?: string;
  element?: React.ReactNode;
  variant?: Variants;
  size?: Sizes;
  isDisabled?: boolean;
  isPending?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

type Variants = 'main' | 'primary' | 'warning' | 'secondary' | 'ghost' | 'danger';
type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | undefined;
export function ThemedButton({ style, text, element, variant = 'main', size, isDisabled, isPending, onPress, ...otherProps}: ThemedViewProps) {
  // const colorScheme = useColorScheme();

  return (
    <Button
      size={size}
      className={
        variant === 'main'
          ? 'bg-green-600 dark:bg-white'
          : variant === 'secondary'
          ? 'bg-stone-900'
          : variant === 'primary'
          ? 'bg-blue-500'
          : variant === 'warning'
          ? 'bg-amber-500'
          : variant === 'ghost'
          ? 'bg-stone-700 dark:bg-white'
          : variant === 'danger'
          ? 'bg-red-700'
          : 'bg-green-700 dark:bg-stone-300'
      }
      isDisabled={isDisabled}
      onPress={onPress}
      style={[{borderRadius: 7},style]}
      {...otherProps}
      >
      {isPending ? <ButtonSpinner /> : 
        element != null ? element : 
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
      }
      
    </Button>
  );
}
