import React from 'react';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { View, ViewProps } from 'react-native';
import { cardStyle } from './styles';
import { useColors } from '@/src/hooks';

type ICardProps = ViewProps &
  VariantProps<typeof cardStyle> & { className?: string };

const Card = React.forwardRef<React.ComponentRef<typeof View>, ICardProps>(
  function Card(
    { className, size = 'md', variant = 'elevated', ...props },
    ref
  ) {
    const colors = useColors();
    return (
      <View
        className={cardStyle({ size, variant, class: className })}
        {...props}
        ref={ref}
        style={[{ backgroundColor: colors.background }]}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
