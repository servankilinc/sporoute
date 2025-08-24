import * as React from 'react';
import {Card} from '@/components/ui/card';
import {Divider} from '@/components/ui/divider';
import {Heading} from '@/components/ui/heading';
import {HStack} from '@/components/ui/hstack';
import {Text} from '@/components/ui/text';
import {VStack} from '@/components/ui/vstack';
import Program from '@/src/database/models/Program';

// import ExerciseCardByProgress from './exerciseCardByProgress/ExerciseCardByProgress';

type SectionProps = {
  program: Program;
};

export default function ProgramCard(props: SectionProps): React.JSX.Element {
  return (
    <Card className="m-3 p-4 border rounded-2xl shadow-md">
      <HStack className="w-full content-between">
        <Heading size="xs" className="text-stone-800 dark:text-stone-50">
          {props.program.name}
        </Heading>
        {/* <VStack className='items-end'>
          <Text size='2xs' color='#A1A1A1'>
            Creating Date
          </Text>
          <Text size='2xs' fontWeight="$bold" color='#A1A1A1'>
            {GetDateText(programDetailCurentDay.program.createdDate)}
          </Text>
        </VStack> */}
      </HStack>
      {/* <VStack gap="$1">
        <Divider my="$2" bgColor='#f6f6f6' />
        {
          programDetailCurentDay.exerciseList &&
            programDetailCurentDay.exerciseList.map((_programExercise, index) =>
              <ExerciseCardByProgress key={index} programExerciseDetai={_programExercise} />
            )
        }
      </VStack> */}
    </Card>
  );
}

function GetDateText(date: Date | undefined): string {
  date = date ? new Date(date) : date;
  return date && date instanceof Date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : '';
}
