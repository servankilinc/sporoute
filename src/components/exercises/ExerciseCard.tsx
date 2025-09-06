//#region imports
import React from 'react';
import {HStack} from '@/components/ui/hstack';
import {Image} from '@/components/ui/image';
import {VStack} from '@/components/ui/vstack';
import {ThemedText, ThemedView} from '../global';
import {exerciseImageMap} from '@/assets/images/exercises';
import {View} from 'react-native';
import ExerciseResponseDto from '@/src/models/exercise/ExerciseResponseDto';
//#endregion

type SectionProps = {
  exercise: ExerciseResponseDto;
};

function ExerciseCard({exercise}: SectionProps): React.JSX.Element {
  return (
    <ThemedView style={{marginHorizontal: 0}}>
      <HStack style={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <VStack className="w-4/6 mb-4">
          <ThemedText className="font-bold">{exercise?.name ?? 'No Info'}</ThemedText>
          <ThemedText className="font-light mb-2" type="custom" style={{fontSize: 11}}>
            {exercise.regions && exercise.regions.length > 0 && exercise.regions.map(r => r.name + ' ')}
          </ThemedText>
          <ThemedText type="custom" style={{fontWeight: '500', fontSize: 12}}>
            {exercise?.description ?? 'No Info'}
          </ThemedText>
        </VStack>
        <View className="w-24 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl p-0">
          <Image
            source={exerciseImageMap[exercise.id] || exerciseImageMap['placeholder']}
            // exercise.content ? exercise.content :
            alt="exercise"
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
            borderRadius={9}
          />
        </View>
      </HStack>
    </ThemedView>
  );
}

export default ExerciseCard;
