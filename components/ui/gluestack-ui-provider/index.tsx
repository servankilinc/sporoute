import React from 'react';
import {config} from './config';
import {View, ViewProps} from 'react-native';
import {OverlayProvider} from '@gluestack-ui/core/overlay/creator';
import {ToastProvider} from '@gluestack-ui/core/toast/creator';
import {useColorScheme} from '@/src/hooks';

export function GluestackUIProvider({...props}: {children?: React.ReactNode; style?: ViewProps['style']}) {
  const colorScheme = useColorScheme();

  return (
    <View style={[config[colorScheme!], {flex: 1, height: '100%', width: '100%'}, props.style]}>
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
