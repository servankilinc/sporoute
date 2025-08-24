import {ExerciseType} from '@/src/constants/ExerciseTypes';

export default class ProgramExerciseBaseModel {
  exerciseId!: string;
  name!: string;
  content!: string;
  description?: string;
  exerciseType!: ExerciseType;

  programExerciseId!: string;
  addedDate!: Date;
  day!: number;
  numberOfSets!: number;
  numberOfRepetition!: number;
  time!: number;
}
