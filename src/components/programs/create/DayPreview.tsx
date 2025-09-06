import React, {useEffect, useState} from 'react';
import {ThemedText, ThemedView} from '../../global';
import {VStack} from '@/components/ui/vstack';
import {Divider} from '@/components/ui/divider';
import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {ThemedAlert} from '../../global/ThemedAlert';
import {useAppSelector} from '@/src/redux/hook';
import {RootState} from '@/src/redux/Store';
import ProgramExerciseDetailModel from '../../../models/programExercise/ProgramExerciseDetailModel';
import exerciseService from '@/src/database/services/exerciseService';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HStack } from '@/components/ui/hstack';

export default function DayPreview(): React.JSX.Element {
  const [previewProgramExercises, setPreviewProgramExercises] = useState<ProgramExerciseDetailModel[]>([]);
  const createdProgram = useAppSelector((state: RootState) => state.statesCreateProgram.createdProgram);
  const exerciseList = useAppSelector((state: RootState) => state.statesCreateProgram.exerciseList);

  useEffect(() => {
    if (createdProgram?.id != null) {
      fetchExercisesOfProgram();
    }
  }, [exerciseList, createdProgram]);

  const fetchExercisesOfProgram = async () => {
    const response = await exerciseService.GetProgramExerciseDetails(createdProgram!.id);
    setPreviewProgramExercises(response);
  };

  return (
    <ThemedView>
      <VStack>
        <HStack className='content-between'>
          <ThemedText>Preview</ThemedText>
          <ThemedText type='title'>{createdProgram?.name}</ThemedText>
        </HStack>
        <Divider className="my-2" />
        
        {previewProgramExercises && previewProgramExercises.length > 0 ?
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Exercise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewProgramExercises.map((data, index) => 
                <TableRow>
                  <TableData>
                    {
                      data.day == 1 ? 'Monday' : 
                      data.day == 2 ? 'Tuesday' : 
                      data.day == 3 ? 'Wednesday' : 
                      data.day == 4 ? 'Thurseday' : 
                      data.day == 5 ? 'Friday' : 
                      data.day == 6 ? 'Saturday' : 
                      data.day == 7 ? 'Sunday' : 
                      'No Info'
                    }
                  </TableData>
                  <TableData>{data.name}</TableData>
                  <TableData>
                    {
                      data.exerciseType == ExerciseType.Weight ? `(${data.numberOfSets} x ${data.numberOfRepetition})` : 
                      data.exerciseType == ExerciseType.Cardio ? `${data.time} min` : ''
                    }
                  </TableData>
                </TableRow>
              )}
            </TableBody>
          </Table>  
        : 
          <ThemedAlert text="Not exist any exercise for this day!" />
        }
        
      </VStack>
    </ThemedView>
  );
}
