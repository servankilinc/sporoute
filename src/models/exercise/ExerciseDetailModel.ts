import {RegionResponseDto} from '../Region/RegionResponseDto';
import ExerciseResponseDto from './ExerciseResponseDto';

export default class ExerciseDetailModel {
  exercise!: ExerciseResponseDto;
  regions?: RegionResponseDto[];
}
