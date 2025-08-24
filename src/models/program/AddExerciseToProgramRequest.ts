import {ExerciseType} from '@/src/constants/ExerciseTypes';

export default interface AddExerciseToProgramRequest {
  programId: string;
  exerciseId: string;
  day: number;
  exerciseType: ExerciseType;
  numberOfSets?: number;
  numberOfRepetition?: number;
  time?: number;
}
