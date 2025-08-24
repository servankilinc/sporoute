import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {RegionResponseDto} from '../Region/RegionResponseDto';

export default interface ProgramExerciseResponseModel {
  exerciseId: string;
  name: string;
  content: string;
  description: string;
  exerciseType: ExerciseType;

  programExerciseId: string;
  addedDate: Date;
  day: number;
  numberOfSets: number;
  numberOfRepetition: number;
  time: number;

  regions: RegionResponseDto[];
}
