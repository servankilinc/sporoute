import {ExerciseType} from '@/src/constants/ExerciseTypes';

export default interface UpdateExerciseOfProgramRequest {
  programExerciseId: string;
  exerciseType: ExerciseType;
  numberOfSets?: number;
  numberOfRepetition?: number;
  time?: number;
}
