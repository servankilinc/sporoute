import ExerciseResponseDto from '../../Exercise/ExerciseResponseDto';
import {RegionResponseDto} from '../../Region/RegionResponseDto';
import ProgramExerciseResponseDto from '../ProgramExerciseResponseDto';

export default class ProgramExerciseInteractionModel {
  exercise!: ExerciseResponseDto;
  programExercise!: ProgramExerciseResponseDto;
  isAdded!: boolean;
  regions?: RegionResponseDto[];
}
