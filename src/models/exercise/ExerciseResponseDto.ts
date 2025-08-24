import {ExerciseType} from '@/src/constants/ExerciseTypes';
import {RegionResponseDto} from '../Region/RegionResponseDto';

export default interface ExerciseResponseDto {
  id: string;
  name: string;
  content?: string;
  description?: string;
  exerciseType: ExerciseType;
  regions?: RegionResponseDto[];
}
