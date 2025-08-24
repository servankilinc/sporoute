import ExerciseResponseDto from '../../Exercise/ExerciseResponseDto';
import {RegionResponseDto} from '../../Region/RegionResponseDto';
import ProgramExerciseResponseDto from '../ProgramExerciseResponseDto';

export default class ProgramExerciseInteractionMultipleDayModel {
  exercise!: ExerciseResponseDto;
  programExercises?: ProgramExerciseResponseDto[] | undefined;
  regions?: RegionResponseDto[] | undefined;
}
