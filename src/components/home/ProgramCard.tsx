import * as React from 'react';
import {Divider} from '@/components/ui/divider';
import {HStack} from '@/components/ui/hstack';
import {VStack} from '@/components/ui/vstack';
import { ThemedText, ThemedView } from '../global';
import ProgramDetailCurrentDayModel from '@/src/models/program/ProgramDetailCurrentDayModel';
import ExerciseCardByProgress from './ExerciseCardByProgress';

type SectionProps = {
  program: ProgramDetailCurrentDayModel;
};

export default function ProgramCard(props: SectionProps): React.JSX.Element {
  const {program, fulfillmentExerciseModel} = props.program;
  return (
    <ThemedView className='my-2'>
      <HStack className="w-full" style={{justifyContent: "space-between"}}>
        <ThemedText style={{fontWeight: '600'}} >
          {program.name}
        </ThemedText>
        <ThemedText style={{fontSize: 11}}>
          {GetDateText(program.createdDate)}
        </ThemedText>
      </HStack>
      <VStack space={"sm"}>
        <Divider className="my-2" />
        {
          fulfillmentExerciseModel &&
            fulfillmentExerciseModel.map((_programExercise, index) =>
              <ExerciseCardByProgress key={index} fulfillmentModel={_programExercise} />
            )
        }
      </VStack>
    </ThemedView>
  );
}

function GetDateText(date: Date | undefined): string {
  date = date ? new Date(date) : date;
  console.info("DATE => ", date?.toDateString())
  return date && date instanceof Date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : '';
}