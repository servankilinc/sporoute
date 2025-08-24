import { Alert, AlertText } from '@/components/ui/alert';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import AntDesign from '@react-native-vector-icons/ant-design';
import React from 'react';
import {type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
  text: string;
  button?: () => React.JSX.Element; 
};
 
export function ThemedAlert({style, text, button, ...otherProps}: ThemedViewProps) {

  return (
    <Alert className="m-2 p-6 rounded-2xl shadow-xl" action="warning" variant="solid" style={style} {...otherProps}>
      <VStack className="w-full items-center" space="2xl">
        <HStack className="items-start content-center">
          <AntDesign name="info-circle" size={16} color={'orange'} style={{marginHorizontal: 10, marginTop: 3}} />
          <AlertText>
            {text}
          </AlertText>
        </HStack>
        {button && button()}
      </VStack>
    </Alert>
  );
}
