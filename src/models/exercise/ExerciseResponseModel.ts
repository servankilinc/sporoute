import {RegionResponseDto} from '../Region/RegionResponseDto';
import ExerciseResponseDto from './ExerciseResponseDto';

export default class ExerciseResponseModel {
  exercise!: ExerciseResponseDto;
  regions?: RegionResponseDto[];
}
