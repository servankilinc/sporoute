import {Box} from '@/components/ui/box';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import React from 'react';
import {ThemedText} from '../../global';
import { View } from 'react-native';

export class StepperProps {
  title!: string;
  step!: number;
  isActive!: boolean;
}

export default function Stepper({data}: {data: StepperProps[]}) {
  return (
    <HStack className="w-full mb-4 mt-2 px-6" style={{justifyContent: "space-around", alignItems: "center"}} space="md">
      {data &&
        data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 && <Divider className="w-1/3"/>}
              <Step title={item.title} step={item.step} isActive={item.isActive} />
            </React.Fragment>
          );
        })}
    </HStack>
  );
}

function Step({title, step, isActive}: StepperProps): React.JSX.Element {
  return (
    <VStack className="items-center" space="xs">
      <View className={isActive ? "bg-green-700 w-8 h-8 rounded-xl p-1" : "bg-stone-300 w-8 h-8 rounded-xl p-1"}>
        <Text className={isActive ? "text-center text-white" : "text-center text-stone-900"}>{step}</Text>
      </View>
      <ThemedText className="text-center text-sm mt-1" type='custom' style={{fontWeight: isActive ? '600' : '400', fontSize:  isActive ? 13 : 11}}>
        {title}
      </ThemedText>
    </VStack>
  );
}
