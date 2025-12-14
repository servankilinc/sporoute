import fulfilmentService from '@/src/database/services/fulfilmentService';
import {FulfillmentsCurrentDayModel} from '@/src/models/program/ProgramDetailCurrentDayModel';
import React, {PropsWithChildren, useState} from 'react';
import {ThemedText, ThemedView} from '../global';
import {Switch} from '@/components/ui/switch';
import {Spinner} from '@/components/ui/spinner';
import {VStack} from '@/components/ui/vstack';
import {HStack} from '@/components/ui/hstack';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {Box} from '@/components/ui/box';
import {Image} from '@/components/ui/image';
import {exerciseImageMap} from '@/assets/images/exercises';
import Svg, {G, Path} from 'react-native-svg';
import {Dimensions, View} from 'react-native';

export default function ExerciseCardByProgress({fulfillmentModel}: {fulfillmentModel: FulfillmentsCurrentDayModel}) {
  const [switchValue, setSwitchValue] = useState(fulfillmentModel.completionStatus ?? false);
  const [completionDayCount, setCompletionCount] = useState(fulfillmentModel.completionCount ?? 0);
  const totalDayCount = fulfillmentModel.completionCount || 0 + fulfillmentModel.inCompletionCount || 0;

  const [isPending, setIsPending] = useState(false);

  const SendCompletionStatus = async (value: boolean): Promise<void> => {
    try {
      setIsPending(true);
      await fulfilmentService.CompletedTrigger(fulfillmentModel.programExercise.id);

      setSwitchValue(value);
      setCompletionCount(prev => (value ? prev + 1 : prev - 1));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ThemedView style={{borderWidth: 0}}>
      <VStack style={{alignItems: 'center'}}>
        <HStack style={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <ThemedText>
            {fulfillmentModel.exercise.name}
            {fulfillmentModel.exercise.exerciseType == ExerciseType.Weight &&
              ` (${fulfillmentModel.programExercise.numberOfSets} x ${fulfillmentModel.programExercise.numberOfRepetition})`}
          </ThemedText>
          {isPending ? (
            <Spinner color="$emerald600" />
          ) : (
            <Switch size="lg" value={switchValue} isDisabled={isPending} onValueChange={e => SendCompletionStatus(e)} />
          )}
        </HStack>
      </VStack>
      <HStack style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <HalfCircleGraph total={totalDayCount} applied={completionDayCount} />
        <Box className="max-w-2/3">
          <Image
            source={exerciseImageMap[fulfillmentModel.exercise.id] || exerciseImageMap['placeholder']}
            alt="exercise"
            style={{width: '100%', height: '100%', borderRadius: 12, objectFit: 'contain'}}
          />
        </Box>
      </HStack>
    </ThemedView>
  );
}

type halfCircleGraphProps = PropsWithChildren<{
  total: number;
  applied: number;
}>;
function HalfCircleGraph({total, applied}: halfCircleGraphProps): React.JSX.Element {
  const size = Dimensions.get('window').width / 5;
  const strokeWidth = 6;

  if (total == null || total <= 0) {
    return (
      <ThemedText
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontWeight: '500',
          color: '#565656',
        }}>
        No Info
      </ThemedText>
    );
  }
  const progress = (applied * 100) / total;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  const progressLength = (circumference * progress) / 100;

  const dashArray = `${progressLength}, ${circumference}`;
  const dashArray2 = `${(circumference * progress) / progress - strokeWidth - 2}, ${circumference}`;

  return (
    <View style={{position: 'relative'}}>
      <Svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        <G rotation={strokeWidth} origin={`${size / 2}, ${size / 2}`}>
          <Path
            d={`M${size / 2} ${size / 2} m-${radius} 0 a${radius} ${radius} 0 1 1 ${2 * radius} 0`}
            fill="none"
            stroke="#D9D9D9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray2}
          />
          <Path
            d={`M${size / 2} ${size / 2} m-${radius} 0 a${radius} ${radius} 0 1 1 ${2 * radius} 0`}
            fill="none"
            stroke="#5EBA88"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
          />
        </G>
      </Svg>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          margin: 0,
          width: size,
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <ThemedText
          style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: '500',
          }}>
          {total} / {applied}
        </ThemedText>
        <ThemedText
          style={{
            textAlign: 'center',
            fontSize: 9,
            fontWeight: '200',
          }}>
          Processed
        </ThemedText>
      </View>
    </View>
  );
}
